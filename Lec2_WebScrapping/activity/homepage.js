//npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");
let link  = "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup";


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

