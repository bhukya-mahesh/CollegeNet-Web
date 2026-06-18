import { io } from "socket.io-client";

const socket = io("https://collegenet-web.onrender.com",{
    autoConnect: false,
});

export default socket;