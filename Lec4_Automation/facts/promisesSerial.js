let fs = require("fs");

// promises / f1 => f2 => f3
// promises hell => 
// promises chaining 

let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function(data){
    console.log("Content = " + data);
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    f2KaPromise.then(function(data){
        console.log("Content = " + data);
        let f3KaPromise = fs.promises.readFile("./f3.txt");
        f3KaPromise.then(function(data){
            console.log("Content = " + data);
        });
    });
});
f1KaPromise.catch(function(error){
    console.log(error);
});