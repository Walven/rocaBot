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
		en: 'To request help, please use our support website. (Remember to check if somemone else has already had the same problem!)',
		fr: 'Pour demander de l\'aide, merci d\'utiliser notre site de support. (Pensez à d\'abord rechercher si quelqu\'un n\'a pas déjà eu le même problème !)',
	},
	buttonLabel: {
		en: 'Access the support',
		fr: 'Accéder au support',
	},
};

module.exports = {
	// Build slash command
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Get link to the support website')
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
					.setURL(config.url.support)
					.setLabel(commandConfig.buttonLabel[lang]),
			);
		await interaction.reply({ content: commandConfig.replySentence[lang], components: [row] });
	},
};