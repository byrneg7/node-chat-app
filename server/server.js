const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000


var app = express();
var server = http.createServer(app);
var io = socketIO(server); //websockets server - emit or listen to events

app.use(express.static(publicPath));



io.on('connection', (socket) => { //the event passes clients socket as an argument 
  console.log('New user connected');

  socket.emit('welcomeMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newUser', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('Message receiveddd', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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

