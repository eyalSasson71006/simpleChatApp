const express = require('express');
const socketIo = require('socket.io');
const app = express();

const PORT = 8181;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const io = socketIo(server);

io.on("connection", (stream) => {
    console.log("User connected");

    stream.on("disconnect", () => {
        console.log("User disconnected");
    });
});