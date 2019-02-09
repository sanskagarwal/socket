var socket = io();

socket.on('connect',function() {
    console.log("connected to server");
});

socket.on('disconnect',function() {
    console.log("Disconnected from server");
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
});

$("#message-form").on("submit",function(e){
    e.preventDefault();
    var messageText = $("[name='message']").val().trim();
    if(messageText==="") {
        return false;
    }
    socket.emit("createMessage",{from: "Dk", text: messageText},function() {
        console.log("done");
        $("[name='message']").val("");
    });
});

var locationButton = $("#send-location");
locationButton.on("click", function() {
    if ("geolocation" in navigator) {
        locationButton.attr('disabled', true).text("Sending Location...");
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text("Send Location");
            socket.emit("createLocationMessage", {from: "Ds", latitude: position.coords.latitude, longitude: position.coords.longitude});
        }, function() {
            locationButton.removeAttr('disabled').text("Send Location");
            alert("Unable to fetch Location!");
        });
    } else {
        alert("Geolocation not supported by your browser!");
    }
});
