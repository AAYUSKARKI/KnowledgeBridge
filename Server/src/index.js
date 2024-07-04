import dotenv from "dotenv";
import connectdb from "./DBconfig/index.js";
import { app } from "./app.js";
import {User} from "./models/user.models.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config({path : './.env'})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
  },
});

let onlineUsers = {}; // Example: { userId: { username, status: 'online' }, ... }

io.on('connection', (socket) => {
    // Handle new user connection
    socket.on('newUser', (data) => {
        onlineUsers[data.userId] = {
            username: data.username,
            status: 'online'
        };
        io.emit('userStatus', Object.values(onlineUsers)); // Broadcast updated online users list
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        if (onlineUsers[socket.id]) {
            onlineUsers[socket.id].status = 'offline';
            delete onlineUsers[socket.id];
            io.emit('userStatus', Object.values(onlineUsers)); // Broadcast updated online users list
        }
    });
});

// Query online users (example route)
app.get('/api/onlineUsers', (req, res) => {
    const onlineUserIds = Object.keys(onlineUsers);
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
.then(()=>{
  server.listen(process.env.PORT||5000,()=>{
    console.log(`server is running at port: ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})

export { io }