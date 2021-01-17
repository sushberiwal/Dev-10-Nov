// npm install express => node js server create
// npm install nodemon => dev dependencie
// npm install socket.io => actual socket code

// app.js => node app / node server
const express = require("express");
const app = express();

// socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);



// client ko public folder ka access
app.use( express.static("public"));

let users  = [];



// on data consume 
io.on('connection', function(socket){
    // console.log(socket);
    console.log(`${socket.id} connected`);
    users.push({id:socket.id})

    socket.on("join" , function(username){
        // users.push({id:socket.id , username})
        for(let i=0 ; i<users.length ; i++){
            if(users[i].id == socket.id){
                users[i].username = username;
                break;
            }
        }
        socket.broadcast.emit("chat-join" , username);
    })

    socket.on("chat" , function(message){
        let username;
        for(let i=0 ; i<users.length ; i++){
            if(users[i].id == socket.id){
                username = users[i].username;
                break;
            }
        }
        socket.broadcast.emit("chat-left" , {message , username} );
    })

    socket.on('disconnect', function() {
        let idx;
        let name;
        for(let i=0 ; i<users.length ; i++){
            if(users[i].id == socket.id){
                idx=i;
                name = users[i].username;
                break;
            }
        }
        socket.broadcast.emit("leave" , name );
        users.splice(idx , 1);
     });
});



let port = 3000;
http.listen(port , function(){
    console.log("Server started at port 3000 !!!");
})








