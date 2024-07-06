import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { Apierror } from "./utils/apierror.js";
import cookieParser from "cookie-parser";
const app = express();

//dotenv config
dotenv.config({path : './.env'})



  const allowedOrigins = ['https://knowledgebridge.netlify.app', 'http://localhost:5173','https://knowledge-bridge-rouge.vercel.app'];

  const corsOptions = {
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Foo'],
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import galleryRouter from './routes/gallery.routes.js'
import eventRouter from './routes/event.routes.js'
import pollRouter from './routes/poll.routes.js'
import communityRouter from './routes/community.routes.js'
import messagerouter from './routes/message.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/gallery",galleryRouter)
app.use("/api/v1/events",eventRouter)
app.use("/api/v1/polls",pollRouter)
app.use("/api/v1/communities",communityRouter)
app.use("/api/v1/messages",messagerouter)
app.use("*", (req, res) => {
    res.status(404).json({message: "Not Found"})
})

export { app }