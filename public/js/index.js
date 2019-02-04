var socket = io();
//io method initiates request from client to server to
//open a web socket and keep that connection open

socket.on('connect', function () {
    console.log('connected to server');
});

socket.emit('createMessage', {
    from: 'Greg',
    text: 'Hey. This is Greg'
});

socket.on('newMessage', function (message) {
    console.log('new message received: ', message);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


