const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const XMLHttpRequest = require('xhr2');

 
function readFile()
{
    var text = fs.readFileSync('Commands/Utility/character.txt', 'utf-8');
    return(text);
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomcharacter')
        .addStringOption(option => 
            option.setName('number')
            .setDescription("number of characters")
            .setRequired(true)
            )
		.setDescription('Gives you random characters'),
	async execute(interaction) {
        const num = interaction.options.getString('number');
		await interaction.reply(getCharacter(num));
	},
};




function getCharacter(num)
{

    let character = readFile().toString().split("\n");

    //console.log(character);

    let arr = [];

    for(let i = 0; i != num; i++)
    {
        let x = Math.floor(Math.random() * character.length);
        while(arr.includes(character[x].replace("\r", "")))
        {
            x = Math.floor(Math.random() * character.length);
        }

        arr.push(character[x].replace("\r",""));

    }
    let output = "";

    for(let i = 0; i != arr.length; i++)
    {
        output += `${i+1}) ${arr[i]}\n`;
    }
    return output;
    
}

