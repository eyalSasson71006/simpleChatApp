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

let messages = [];

io.on("connection", (stream) => {
    console.log("User connected");
    io.emit("past messages", messages);

    stream.on("message sent", (message) => {
        messages.push(message);
        io.emit("message received", message);
    });

    stream.on("disconnect", () => {
        console.log("User disconnected");
    });
});