/**
 * Sends welcome channels messages
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../config.json');

// Local config
const commandConfig = {
	rules: {
		buttonLabel: 'Agree',
		message: {
			en: 'Same, but in english',
			fr: 'Accédez au serveur Discord en cliquant sur le bouton "Accepter" ci-dessous. Vous affirmez alors avoir pris connaissance des règles et les accepter.',
		},
	},
};

module.exports = {
	// Command definition to be registered
	data: new SlashCommandBuilder()
		.setDefaultPermission(false)
		.setName('admin')
		.setDescription('Admin commands')
		.addStringOption(option =>
			option.setName('action')
				.setDescription('choose admin command')
				.setRequired(true)
				.addChoice('Send rule agreement prompt', 'sendRuleAgreementPrompt')),

	// Command permissions
	permissions: [
		{
			id: config.role.staff,
			type: 'ROLE',
			permission: true,
		},
	],

	// Command action
	async execute(interaction) {
		const action = interaction.options.getString('action');

		let replySentence;
		const buttons = [];

		switch (action) {
		case 'sendRuleAgreementPrompt':
			replySentence = commandConfig.rules.message.fr + '\n' + commandConfig.rules.message.en;
			buttons.push(
				new MessageButton()
					.setCustomId('ruleAgreement')
					.setLabel(commandConfig.rules.buttonLabel)
					.setStyle('PRIMARY'),
			);
			break;
		}

		const row = new MessageActionRow()
			.addComponents(buttons);
		await interaction.reply({ content: replySentence, components: [row] });
	},
};