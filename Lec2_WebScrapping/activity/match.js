// ek match ki details
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");


// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";

function getMatch(link){
    request(link , cb);
}

function cb(error , response ,data){
    parseData(data);
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
        console.log(teamName);

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
                processDetails(teamName , batsmanName , runs , balls , fours , sixes);
            }
        }
    }
}


// filesystem module
function checkTeamFolder(teamName){
    // teamName = "WorldCup/India"
    return fs.existsSync("WorldCup/"+teamName);
}

function checkBatsmanFile(teamName , batsmanName){
    // "WorldCup/India/MSDHoni.json";
    let batsmanPath = `WorldCup/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function createTeamFolder(teamName){
    fs.mkdirSync("WorldCup/"+teamName);
}


function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes){
    let batsmanPath = `WorldCup/${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    // stringified
    batsmanFile =JSON.parse(batsmanFile);
    // orginial form
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}


function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes){
    // "India/MSDHoni.json";
    let batsmanPath = `WorldCup/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes){
    // check if team folder exists ?
    let isTeamExist = checkTeamFolder(teamName);
    
    if(isTeamExist){
        // check batsman ki file
        let isBatsmanExist = checkBatsmanFile(teamName , batsmanName);
        if(isBatsmanExist){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);    
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);
    }
}

module.exports = getMatch;