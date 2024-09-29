const express = require('express');
const socketIo = require('socket.io');

const app = express();
const PORT = 8181;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
});

let chatHistory = [];

io.on("connection", (stream) => {
    console.log("User connected");
    stream.emit("recover history", chatHistory);

    stream.on("message sent", (message) => {
        chatHistory.push(message);
        io.emit("message received", message);
    });

    stream.on("disconnect", () => {
        console.log("User disconnected");
    });
});