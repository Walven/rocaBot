/**
 * Sends welcome channels messages
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	rules: {
		buttonLabel: 'Agree ・ Accepter',
		message: {
			en: 'Access the server by clicking the "Agree" button below. You then confirm that you have read the rules and accept them.',
			fr: 'Accédez au serveur en cliquant sur le bouton "Accepter" ci-dessous. Vous affirmez alors avoir pris connaissance des règles et les accepter.',
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
			replySentence = commandConfig.rules.message.fr + '\n\n' + commandConfig.rules.message.en + '\n\u200b';
			buttons.push(
				new MessageButton()
					.setCustomId('agreeToRules')
					.setLabel(commandConfig.rules.buttonLabel)
					.setStyle('SUCCESS'),
			);
			break;
		}
		const row = new MessageActionRow()
			.addComponents(buttons);
		interaction.guild.channels.cache.get(config.channel.rules).send({ content: replySentence, components: [row] });
		await interaction.reply({ content: 'Message sent, check rules channel', ephemeral: true });
	},
};