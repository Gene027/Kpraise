import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import blogRoutes from './routes/blog.js';
import audioRoutes from './routes/audios.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';   //package for .env file for code privacy
import cookieParser from "cookie-parser";

const app = express();
dotenv.config(); //for process.env to be usable 

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log('connected to db');
        })
        .catch(err => {
            throw err;
        })
}

//middlewares
app.use(cookieParser()); //enable use of cookies
app.use(express.json()); //to parse post req to json rather than undefined

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000' //change if on development or production
}));    //grant access to all server to make query due to cors security

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audios", audioRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/blog", blogRoutes);

//Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;  //default to 500 if it cannot infere the specific error

    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


app.listen(8800, () => {
    connect();                      //connect to mongodb upon creation of server
    console.log("connected to server")
})
