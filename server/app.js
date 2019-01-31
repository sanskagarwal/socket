const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname,"../public");
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New User connected");

    socket.on("createMessage", (message) => {
        console.log("message",message);
        socket.broadcast.emit("newMessage", generateMessage(message.from,message.text));
    });

    socket.emit("newMessage", generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit("newMessage", generateMessage('Admin','new user joined'));

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(PORT,() => {
    console.log(`Server running on PORT ${PORT}`);
});