let fs = require("fs");


function fileReadPromise(path){
    return new Promise(  function(resolve , reject){
        fs.readFile(path , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve("kuch bhi");
            }
        })
    });
}

// fs.promises.readFile();
// fs.promise.readFile => fs.readFile
// promises => callbacks

let f1KaPromise = fileReadPromise("./f1.txt");

f1KaPromise.then(function(data){
    console.log("Content = " + data);
});

f1KaPromise.catch(function(error){
    console.log(error);
});
