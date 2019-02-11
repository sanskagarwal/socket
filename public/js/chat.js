var socket = io();

function scrollToBottom() {
    var messages = $("#message-list");
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+scrollTop + newMessageHeight + lastMessageHeight>=scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function() {
    console.log("connected to server");
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(e) {
        if(e) {
            window.location.href="index.html";
        }
    });
});

socket.on('disconnect',function() {
    console.log("Disconnected from server");
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach( function(user) {
        ol.append($('<li></li>').text(user));
    });
    $("#users").html(ol);
    console.log(users);
});

socket.on("newMessage",function(message){
    var template=$("#message-template").html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html=Mustache.render(template,{
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });
    $("#message-list").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
    var template=$("#message-location-template").html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html=Mustache.render(template,{
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    });
    $("#message-list").append(html);
    scrollToBottom();
});

$("#message-form").on("submit",function(e){
    e.preventDefault();
    var messageText = $("[name='message']").val().trim();
    if(messageText==="") {
        return false;
    }
    socket.emit("createMessage",{text: messageText},function() {
        $("[name='message']").val("");
    });
});

var locationButton = $("#send-location");
locationButton.on("click", function() {
    if ("geolocation" in navigator) {
        locationButton.attr('disabled', true).text("Sending Location...");
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text("Send Location");
            socket.emit("createLocationMessage", {latitude: position.coords.latitude, longitude: position.coords.longitude});
        }, function() {
            locationButton.removeAttr('disabled').text("Send Location");
            alert("Unable to fetch Location!");
        });
    } else {
        alert("Geolocation not supported by your browser!");
    }
});