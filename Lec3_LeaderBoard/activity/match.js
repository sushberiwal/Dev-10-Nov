// ek match ki details
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

let leaderboard = [];
let count=0;

// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";

function getMatch(link){
    // async function
    console.log("sending request !!!" , count);
    count++;
    request(link , cb); //node api => 48 request functions
}

function cb(error , response ,data){
    console.log("Received Data !!!" , count);
    count--;
    parseData(data);
    if(count == 0){
        console.table(leaderboard);
    }
}


function parseData(html){
    // console.log(html);
    let ch = cheerio.load(html);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // [ <div class="Collapsible"> </div> , <div class="Collapsible"> </div>    ]
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("Innings");
        // Australia Innings (50 overs maximum) => ["Australia " , " (50 overs maximum)" ];
        teamName = teamName[0].trim();//"Australia " => "Australia"
        // console.log(teamName);
        if(!teamName.includes("Team")){
            let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
            // [ <tr></tr> , <tr></tr> , <tr></tr>, <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr>   ];
            for(let j=0 ; j<allRows.length-1 ; j++){
                let allTds = ch(allRows[j]).find("td");
                if(allTds.length > 1){
                    let batsmanName = ch(allTds[0]).find("a").text().trim();
                    let runs = ch(allTds[2]).text().trim();
                    let balls = ch(allTds[3]).text().trim() ;
                    let fours = ch(allTds[5]).text().trim();
                    let sixes = ch(allTds[6]).text().trim();
                    // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes}`);
                    processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes);
                }
            }
        }
    }
}



function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);  // "2345" => 2345
    // if batsman entry exists in leaderboard
    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }
    // else
    let entry = {
        Team : teamName ,
        Batsman : batsmanName ,
        Runs : runs ,
        Balls : balls , 
        Fours : fours ,
        Sixes : sixes
    }
    leaderboard.push(entry);
}

module.exports = getMatch;