/**
 * Sends a button with a link to the documentation
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	embed: {
		title: {
			en: '❓  To request help, please use our support website.',
			fr: '❓  Pour demander de l\'aide, merci d\'utiliser notre site de support.',
		},
		description: {
			en: '(Remember to check if somemone else has already had the same problem!)',
			fr: '(Pensez à d\'abord rechercher si quelqu\'un n\'a pas déjà eu le même problème !)',
		}
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
				.setDescription('Reply language')
				.setRequired(false)
				.addChoice('fr', 'fr')
				.addChoice('en', 'en')),

	// Command action
	async execute(interaction) {
		const lang = interaction.options.getString('lang') || 'en';

		let replyEmbed = {
			color: 0x50545b,
			title: commandConfig.embed.title[lang],
			description: commandConfig.embed.description[lang],
		};

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(config.url.support)
					.setLabel(commandConfig.buttonLabel[lang]),
			);

		await interaction.reply({ embeds: [replyEmbed], components: [row] });
	},
};