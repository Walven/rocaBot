/**
 * Gives the 'member' role and asks language
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require ('../../config.json');
const commandConfig = {
	replySentence: 'What language do you speak? \n\nQuelle langue parlez-vous ?\n\u200b',
	button: {
		label: {
			fr: 'Français',
			en: 'English',
		},
	},
};

module.exports = {
	id: 'agreeToRules',
	execute: (interaction) => {
		// add 'member' role
		const memberRole = interaction.member.guild.roles.cache.find(role => role.id = config.role.member);
		interaction.member.roles.add(memberRole);

		const row = new MessageActionRow()
			.addComponents(
				[
					new MessageButton()
						.setCustomId('getEnRole')
						.setStyle('PRIMARY')
						.setLabel(commandConfig.button.label.en),
					new MessageButton()
						.setCustomId('getFrRole')
						.setStyle('PRIMARY')
						.setLabel(commandConfig.button.label.fr),
				],
			);
		interaction.reply({ content: commandConfig.replySentence, ephemeral: true, components: [row] });
	},
};