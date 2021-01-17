let sendButton = document.querySelector("#send-chat");
let chatMessage = document.querySelector("#chat-message");
let chatList = document.querySelector(".chat-list");



let username = prompt("Enter Your Name !!");
console.log(username);

if(username){
    socket.emit("join" , username);
}



sendButton.addEventListener("click" , function(){
    let message = chatMessage.value;
    if(message){
        let chat= document.createElement("div");
        chat.classList.add("chat");
        chat.classList.add("right");
        chat.innerHTML = message;
        // <div class="chat right">ajkshfkjabjksf</div>
        chatList.append(chat);
        chatMessage.value = "";

        socket.emit("chat" , message);
    }
})