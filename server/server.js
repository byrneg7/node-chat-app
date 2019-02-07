const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000


var app = express();
var server = http.createServer(app);
var io = socketIO(server); //websockets server - emit or listen to events
var users = new Users();

app.use(express.static(publicPath));

//io.emit - emits an event to every connected user 
//io.to(roomName).emit
//socket.broadcast.emit - sends the message to everyone on the socket server except the current user
//io.broadcast.to(roomName).emit
//socket.emit -emits an event specifically to one user
//socket.emit - already user specific

io.on('connection', (socket) => { //the event passes clients socket as an argument 
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room); //join a room with the input room name
    users.removeUser(socket.id); //remove from any previous rooms 
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Message received', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
  });
});





//behind the scenes express is using the builtin HTTP module 
//to create the server. We will need to configure HTTP ourselves
//to configure express to work with HTTP and add socket support

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

