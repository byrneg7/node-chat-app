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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target ="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url) //sets and fetches attributes on jquery selected elements in this method
    li.append(a);
    jQuery('#messages').append(li);
});



socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled');
    setTimeout(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            locationButton.removeAttr('disabled')
            alert('Unable to fetch location')
        });
    }, 1000);
});

