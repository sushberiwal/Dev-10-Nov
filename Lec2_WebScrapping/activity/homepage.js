//npm install request
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");
let link  = "https://www.espncricinfo.com/series/_/id/8048/season/2020/indian-premier-league";


request(link , cb);


function cb(error , response ,data){
    console.log("inside callback");
    // console.log(data);
    // fs.writeFileSync("./homepage.html" , data);
    parseData(data);
}

function parseData(html){

    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    // console.log(link);
    // let completeLink = "https://www.espncricinfo.com"+link;
    // String interpolcation
    let completeLink = `https://www.espncricinfo.com${link}`;
    // console.log(completeLink);
    // getAllMatches(completeLink);
    getAllMatches(completeLink);
}

