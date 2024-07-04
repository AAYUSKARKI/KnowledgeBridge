import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { Apierror } from "./utils/apierror.js";
import cookieParser from "cookie-parser";
const app = express();

//dotenv config
dotenv.config({path : './.env'})



  const allowedOrigins = ['https://group-project-livid.vercel.app', 'http://localhost:5173','https://lucidmerch.netlify.app'];

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

  app.use((err, req, res, next) => {
    if (err instanceof Apierror) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Send stack trace only in development
        });
    } else {
        // Handle other types of errors (generic error handling)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [],
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Send stack trace only in development
        });
    }
});
  
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