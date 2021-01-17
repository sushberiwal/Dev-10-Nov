socket.on("chat-left" , function(messageObj){
    console.log(messageObj);
    let chat= document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("left");
    chat.innerHTML = messageObj.username + " : " + messageObj.message;
    chatList.append(chat);
})


socket.on("chat-join" , function(username){
    let chat= document.createElement("div");
    chat.classList.add("join");
    chat.innerHTML = username + " joined the chat !";
    chatList.append(chat);
})

socket.on("leave" , function(username){
    let chat= document.createElement("div");
    chat.classList.add("leave");
    chat.innerHTML = username + " left the chat !";
    chatList.append(chat);
})