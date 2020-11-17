// async keyword
let fs = require("fs");
// await keyword => await can only be used in a async function


// IIFE => Immidiately Invoked Function Expressions

// serial kaam

console.log("Start");


(async function(){
    try{
        let f1KaPromise = fs.promises.readFile("./f1.txt"); // 2 ghante
        let f2KaPromise = fs.promises.readFile("./f2.txt"); // 5 ghante

        let bothFilesKaData = await Promise.all( [f1KaPromise , f2KaPromise] );
        console.log(bothFilesKaData);
    }
    catch(error){
        console.log(error);
    }
})();


console.log("end");
console.log("end");
console.log("end");
console.log("end");


