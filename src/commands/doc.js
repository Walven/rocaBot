/**
 * Sends a button with a link to the documentation
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	replySentence: {
		en: 'Here\'s the link to the developer documentation',
		fr: 'Voici le lien vers la documentation développeur',
	},
	buttonLabel: {
		en: 'Access the documentation',
		fr: 'Accéder à la documentation',
	},
};

module.exports = {
	// Build slash command
	data: new SlashCommandBuilder()
		.setName('doc')
		.setDescription('Get link to the developer documentation')
		.addStringOption(option =>
			option.setName('lang')
				.setDescription('Select reply language')
				.setRequired(false)
				.addChoice('fr', 'fr')
				.addChoice('en', 'en')),

	// Command action
	async execute(interaction) {
		const lang = interaction.options.getString('lang') || 'en';

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(config.url.documentation)
					.setLabel(commandConfig.buttonLabel[lang]),
			);
		await interaction.reply({ content: commandConfig.replySentence[lang], components: [row] });
	},
};