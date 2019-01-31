var socket = io();

socket.on('connect',function() {
    console.log("connected to server");
});

socket.on('disconnect',function() {
    console.log("Disconnected from server");
});

socket.on("newMessage",function(message){
    console.log("newMessage",message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $("#message-list").append(li);
});

$("#message-form").on("submit",function(e){
    e.preventDefault();
    var messageText = $("[name='message']").val().trim();
    if(messageText==="") {
        return false;
    }
    socket.emit("createMessage",{from: "Dk", text: messageText},function() {
        console.log("done");
    });
    $("[name='message']").val("");
});