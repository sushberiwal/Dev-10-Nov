let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// async way , parallely , loops

// iterative code
// for(let i=0 ; i<files.length ; i++){
//     fs.readFile(files[i] , function(error ,data){
//         console.log("Content = "+ data);
//     })
// }



// recursive code

function fileReader(idx){
    if(idx == files.length){
        return;
    }
    
    fileReader(idx+1);
    
    fs.readFile(files[idx] , function(error ,data){
        console.log("Content = " + data);
    })
    
}


fileReader(0);


