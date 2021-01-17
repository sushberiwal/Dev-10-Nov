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


// on data consume 
io.on('connection', function(socket){
    // console.log(socket);
    console.log(`${socket.id} connected`);

    socket.on("mousedown" , function(lineObject){
        socket.broadcast.emit("md", lineObject);
        // console.log("mousedown event fired !!");
        // console.log(lineObject);
    })

    socket.on("mousemove" , function(lineObject){
        socket.broadcast.emit("mm", lineObject);
        // console.log("mousemove event fired !!");
        // console.log(lineObject);
    })


});





// app.get("/" , function(req , res){
//     // res.sendFile(__dirname+"/public/main.html");

//     // by default search in public folder !!
//     res.redirect("main.html");
// })


let port = 3000;
http.listen(port , function(){
    console.log("Server started at port 3000 !!!");
})








