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
	langPrompt: {
		buttonLabel: {
			en: 'English',
			fr: 'Français',
		},
		message: {
			en: 'What language do you speak?',
			fr: 'Quelle langue parlez-vous ?',
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
				.addChoices([
					['Send rule agreement prompt', 'sendRuleAgreementPrompt'],
					['Send lang role prompt', 'sendLangRolePrompt'],
				])),

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
		let replyChannel;
		const buttons = [];

		// One case per command option
		switch (action) {
			/**
			 * Sends the rule agreement message and button to the rules channel
			 */
			case 'sendRuleAgreementPrompt':
				replySentence = commandConfig.rules.message.en + '\n\n' + commandConfig.rules.message.fr + '\n\u200b';
				replyChannel = config.channel.rules;
				buttons.push(
					new MessageButton()
						.setCustomId('agreeToRules')
						.setLabel(commandConfig.rules.buttonLabel)
						.setStyle('SUCCESS'),
				);
				break;

			/**
			 * Sends the lang roles message and buttons to the roles channel
			 */
			case 'sendLangRolePrompt':
				replySentence = commandConfig.langPrompt.message.en + '\n\n' + commandConfig.langPrompt.message.fr + '\n\u200b';
				replyChannel = config.channel.roles;
				buttons.push(
					new MessageButton()
						.setCustomId('getEnRole')
						.setLabel(commandConfig.langPrompt.buttonLabel.en)
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('getFrRole')
						.setLabel(commandConfig.langPrompt.buttonLabel.fr)
						.setStyle('PRIMARY'),
				);
				break;
		}
		const row = new MessageActionRow()
			.addComponents(buttons);
		interaction.guild.channels.cache.get(replyChannel).send({ content: replySentence, components: [row] });
		await interaction.reply({ content: 'Message sent, check rules channel', ephemeral: true });
	},
};