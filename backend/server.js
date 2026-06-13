import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";


import connectDB from "./config/mongodb.js";

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemsRouter.js';
import lostfoundRouter from './routes/lostfoundRouter.js';
import wantedRouter from './routes/wantedrouter.js';
import messageRouter from './routes/messageRouter.js';


import Message from "./models/messagemodel.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
    }
});

// io.on("connection", (socket) => {
//     console.log("A user connected: " + socket.id);
//     socket.on("disconnect", () => {
//         console.log("A user disconnected: " + socket.id);
//     });
//     socket.on("newItem", (item) => {
//         console.log("New item added: ", item);
//         socket.broadcast.emit("newItem", item);
//     });
// });
const onlineUsers = new Map();

io.on("connection", (socket) => {

socket.on(
  "sendMessage",
 async (data) => {
  
    try {
    const {
      senderId,
      receiverId,
      text
    } = data;
    const newMessage = new Message({
        senderId,
        receiverId,
        text
    });
    await newMessage.save();
    console.log(
        "MESSAGE SAVED:",
        newMessage.text
      );

    const receiverSocket =
      onlineUsers.get(receiverId);

    if (receiverSocket) {

      io.to(receiverSocket)
        .emit(
          "receiveMessage",
            newMessage
        );
    }

  }catch(error){
    console.log("MESSAGE ERROR",error);
  }
}
);

    console.log("A user connected:", socket.id);

    socket.on("addUser", (userId) => {

        onlineUsers.set(
            userId,
            socket.id
        );

        console.log(
            "ONLINE USERS:",
            [...onlineUsers]
        );
    });

    socket.on("disconnect", () => {

        for (const [userId, socketId] of onlineUsers) {

            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }

        console.log(
            "A user disconnected:",
            socket.id
        );
    });
});
  


const PORT = process.env.PORT || 4545;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.get("/",(req,res)=> res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/lostfound", lostfoundRouter);
app.use("/api/wanted", wantedRouter);
app.use("/api/messages", messageRouter);


server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`));