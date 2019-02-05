var socket = io();
//io method initiates request from client to server to
//open a web socket and keep that connection open

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('newUser', function (message) {
    console.log(message)
});

socket.on('newMessage', function (message) {
    console.log('new message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});
