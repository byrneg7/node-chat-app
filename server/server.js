const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000


var app = express();
var server = http.createServer(app);
var io = socketIO(server); //websockets server - emit or listen to events

app.use(express.static(publicPath));



io.on('connection', (socket) => { //the event passes clients socket as an argument 
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message received', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});





//behind the scenes express is using the builtin HTTP module 
//to create the server. We will need to configure HTTP ourselves
//to configure express to work with HTTP and add socket support

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

