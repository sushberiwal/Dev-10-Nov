// file system 
// fs module => file system 
// import 

// file system is imported from nodejs to node application (readFile.js);
let fs = require("fs");
let cheerio = require("cheerio");


// let f1KaData =  fs.readFileSync("./f1.txt" , "utf-8");
// console.log(f1KaData);


// html selectors

let htmlKaData = fs.readFileSync("./index.html" , "utf-8");

// html file ke selectors se data chae

let ch = cheerio.load(htmlKaData);
// h1 ka data

// <h1>Heading 1</h1>
let h1KaData = ch("#main").text();
console.log(h1KaData);

// p tag ka data
let pKaData = ch("ul .outer").text();
console.log(pKaData);

// let pKaData = ch(".outer.unique").text();
// console.log(pKaData);
// <h1>Heading 1</h1>
let h1Element = ch("h1");
console.log(h1Element);


