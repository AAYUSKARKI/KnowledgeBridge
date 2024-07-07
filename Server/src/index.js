import dotenv from "dotenv";
import connectdb from "./DBconfig/index.js";
import { app } from "./app.js";
import { User } from "./models/user.models.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config({ path: './.env' });

const allowedOrigins = ['https://knowledgebridge.netlify.app', 'http://localhost:5173', 'https://knowledge-bridge-rouge.vercel.app'];

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

let onlineUsers = {}; // Example: { socketId: { userId, username, status: 'online' }, ... }

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('newUser', (data) => {
    onlineUsers[socket.id] = {
      userId: data.userId,
      username: data.username,
      status: 'online'
    };
    io.emit('userStatus', Object.values(onlineUsers)); // Broadcast updated online users list
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id);
    if (onlineUsers[socket.id]) {
      onlineUsers[socket.id].status = 'offline';
      delete onlineUsers[socket.id];
      io.emit('userStatus', Object.values(onlineUsers)); // Broadcast updated online users list
    }
  });
});

// Query online users (example route)
app.get('/api/onlineUsers', (req, res) => {
  const onlineUserIds = Object.values(onlineUsers).map(user => user.userId);
  // Assuming you have User model for database query
  User.find({ _id: { $in: onlineUserIds } })
    .select('_id username')
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch online users' });
      }
      return res.status(200).json(users);
    });
});

connectdb()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed", err);
  });

export { io };
