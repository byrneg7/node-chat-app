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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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

