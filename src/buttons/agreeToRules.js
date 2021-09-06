/**
 * Gives the 'member' role and asks language
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require ('../../config.json');
const commandConfig = {
	replySentence: {
		langPrompt: 'What language do you speak? \n\nQuelle langue parlez-vous ?\n\u200b',
		langAlreadySet: {
			fr: 'Vous avez déjà accepté les règles, profitez du serveur !',
			en: 'You already accepted the rules, enjoy the server!',
		},
	},
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
		const langRoles = config.role.lang;
		const memberLangRoles = interaction.member.roles.cache.filter(function(role) {
			return Object.values(langRoles).includes(role.id);
		});

		// If lang role already set, do not ask for lang again
		if (memberLangRoles.size) {
			memberLangRoles.find(role => role.id === config.role.lang.en) ?
				interaction.reply({ content: commandConfig.replySentence.langAlreadySet.en, ephemeral: true })
				:
				interaction.reply({ content: commandConfig.replySentence.langAlreadySet.fr, ephemeral: true });
			return;
		}

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
		interaction.reply({ content: commandConfig.replySentence.langPrompt, ephemeral: true, components: [row] });
	},
};