// all macthes wali html 
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");



function getAllMatches(link){
    request( link , cb);
}


function cb(error , response ,data){
    // console.log(data);
    parseData(data);
}



function parseData(html){
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    //[<a> </a> , [<a> </a> , [<a> </a> , [<a> </a> , [<a> </a>]
    // console.log(allATags);
    for(let i=0 ; i<allATags.length ; i++){
        let link = ch(allATags[i]).attr("href");
        let completeLink = `https://www.espncricinfo.com${link}`;
        console.log(completeLink);
    }
}




// getAllMatches => expose // export
module.exports = getAllMatches;








