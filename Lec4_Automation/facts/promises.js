let fs = require("fs");

// B    =>     A
console.log("start");

// pending promise
let f1KaPromise = fs.promises.readFile("./f1.txt");
// Promise <Pending>


console.log(f1KaPromise);

f1KaPromise.then(function(data){
    console.log("Inside then");
    console.log(f1KaPromise);
    console.log("Content = " + data);
});

f1KaPromise.catch(function(error){
    console.log("Inside catch");
    console.log(error);
});


console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
console.log("end");
