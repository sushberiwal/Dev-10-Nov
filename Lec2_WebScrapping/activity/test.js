let fs = require("fs");


let file = [];


let obj = {
    name : "asklfhajs",
    value : "ajskda"
}


file.push(obj);

fs.writeFileSync("test.txt" , JSON.stringify(file));