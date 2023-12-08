const fs = require('fs');
const csv = require('jquery-csv');
const { stringify } = require("csv-stringify");
const idc = require("./sort");

function addToCSV(content)
{
    const filename = "Commands/Utility/matches.csv";
    const stream = fs.createWriteStream(filename);


    const stringy = stringify();

    let text = readCSV('Commands/Utility/matches.csv');
    
    for(let i = 0; i != text.length-1; i++)
    {
        stringy.write(text[i]);
    }

    
    stringy.write(content);
    stringy.pipe(stream);
}

function readCSV(path)
{
    var text = fs.readFileSync(path).toString();
    var arr = text.split("\n");

    for(let i = 0; i != arr.length; i++)
    {
        arr[i] = arr[i].split(",");
    }

    return arr;
}



module.exports = {addToCSV, readCSV, reportToLeaderboard};


function addToLeaderboard(content)
{
    const filename = "Commands/Utility/Leaderboard.csv";
    const stream = fs.createWriteStream(filename);

    const stringy = stringify();

    console.log(content);

    content = idc.SortByWinRate(content);

    for(let i = 0; i != content.length; i++)
    {
        if(content[i].length > 1){
            stringy.write(content[i]);
        }
    }

    stringy.pipe(stream);
}



function reportToLeaderboard(WinnerUSER, WinnerID, LoserUSER, LoserID)
{
    let text = readCSV('Commands/Utility/Leaderboard.csv');

    let winnerupdated = false;
    let loserupdated = false;

    for(let i = 0; i != text.length; i++)
    {
        if(text[i][1] == WinnerID){
            text[i][2] = parseInt(text[i][2]) + 1;
            text[i][4] = parseFloat(text[i][2]) / (parseFloat(text[i][2]) + parseFloat(text[i][3]));
            winnerupdated = true;
        }
        else if(text[i][1] == LoserID)
        {
            text[i][3] = parseInt(text[i][3]) + 1;
            text[i][4] = parseFloat(text[i][2]) / (parseFloat(text[i][2]) + parseFloat(text[i][3]));
            loserupdated = true;
        }
    }

    if(winnerupdated == false)
    {
        text.push([WinnerUSER, WinnerID, 1, 0, 100.0]);
    }
    if(loserupdated == false)
    {
        text.push([LoserUSER, LoserID, 0, 1, 0.0])
    }

    addToLeaderboard(text);
    
}