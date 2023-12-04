const {SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const csv = require('jquery-csv');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const idc = require('../../Extras/writetofile');


let myself_userid;
let myself_username;
let opponent_userid;
let opponent_username;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('reportscore')
        .addUserOption(option => 
            option.setName("user")
            .setDescription("input user")
            .setRequired(true)
            )
		.setDescription('Report Score'),
	async execute(interaction) {

        const target = interaction.options.getUser('user');

        myself_userid = interaction.member.id;
        myself_username = interaction.member.displayName
        opponent_userid = target.id;
        opponent_username = target.username;

        menu(interaction);

	},
};


async function winner(winner, interaction)
{
    console.log(winner)
    if(winner == "me")
    {
        idc.addToCSV([
            `${myself_username}`, `${myself_userid}`,
            "W",
            `${opponent_username}`, `${opponent_userid}`,
            "L"
        ]);

        idc.reportToLeaderboard(myself_username, myself_userid, opponent_username, opponent_userid);
    }
    else
    {
        idc.addToCSV([
            `${opponent_username}`, `${opponent_userid}`,
            "W",
            `${myself_username}`, `${myself_userid}`,
            "L"
        ]);
        idc.reportToLeaderboard(opponent_username, opponent_userid, myself_username, myself_userid);
    }

    await interaction.editReply({
        content: 'Match Successfully Recorded',
        components: []
    });
}


async function menu(interaction)
{
    const myself = new ButtonBuilder()
        .setCustomId("me")
        .setLabel(`${myself_username}`)
        .setStyle(ButtonStyle.Success)
    const opponent = new ButtonBuilder()
        .setCustomId(`opp`)
        .setLabel(`${opponent_username}`)
        .setStyle(ButtonStyle.Danger)
    
    const row = new ActionRowBuilder().addComponents(myself, opponent);

    const response = await interaction.reply({
        content: `Who Won?`,
        components: [row],
    });


    const collectorFilter = i => i.user.id === interaction.user.id;

    try {
        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
        console.log(confirmation.customId);
        if (confirmation.customId.normalize() == "me"){
            winner('me', interaction);
        }
        else{
            winner('opp', interaction)
        };
    } catch (e) {
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }

}