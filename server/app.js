const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname,"../public");
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 
var users = new Users();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params,callback) => {
        if(!(isRealString(params.name) && isRealString(params.room))) {
            return callback("Invalid Data");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage('Admin','Welcome to chat app'));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage('Admin',`User ${params.name} Joined`));
        callback();
    });

    socket.on("createMessage", (message,callback) => {
        io.emit("newMessage", generateMessage(message.from,message.text));
        callback();
    });
    socket.on("createLocationMessage", (message) => {
        io.emit("newLocationMessage", generateLocationMessage(message.from, message.latitude,message.longitude));
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage('Admin',`User ${user.name} Left`));
        }
    });
});

server.listen(PORT,() => {
    console.log(`Server running on PORT ${PORT}`);
});