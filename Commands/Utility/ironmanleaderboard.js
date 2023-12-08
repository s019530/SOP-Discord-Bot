const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const idc = require('../../Extras/writetofile');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ironmanleaderboard')
		.setDescription('Replies with the Leaderboard for Ironmans'),
	async execute(interaction) {

        let text = idc.readCSV('Commands/Utility/Leaderboard.csv');


        

        theEmbed(interaction, text);

		//await interaction.reply("nothing");
	},
};




async function theEmbed(interaction, text)
{
    const embed = new EmbedBuilder()
    .setTitle("Ironman Leaderboard")

    let temp = true;
    for(let i = 1; i != text.length; i++)
    {
        console.log(text[i]);
        if(text[i].length > 1) {
            if(i % 2 == 0)
            {
                temp = false;
            }
            embed.addFields(
                {name: `${i}) ${text[i][0]}`, value: `${text[i][2]} wins, ${text[i][3]} losses`, inline: temp}
            )
            temp = true;
        }
    }

    await interaction.reply({embeds: [embed]});
}