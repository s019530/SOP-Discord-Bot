const fs = require('fs');
const csv = require('jquery-csv');
const { stringify } = require("csv-stringify");

console.log(readCSV());


function addToCSV(content)
{
    const filename = "Commands/Utility/matches.csv";
    const stream = fs.createWriteStream(filename);


    console.log(readCSV());

    const stringy = stringify();
    stringy.write(content);
    stringy.pipe(stream);
}

function readCSV()
{
    var text = fs.readFileSync('Commands/Utility/matches.csv').toString();
    var arr = text.split("\n");

    for(let i = 0; i != arr.length; i++)
    {
        arr[i] = arr[i].split(",");
    }

    return arr;
}



module.exports = {addToCSV, readCSV};
