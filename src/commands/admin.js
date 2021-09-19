/**
 * Sends welcome channels messages
 */
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	rules: {
		buttonLabel: 'Agree ・ Accepter',
		message: {
			en: `${config.customEmoji.ballEn} \u200b Access the server by clicking the "Agree" button below. You then confirm that you have read the rules and accept them.`,
			fr: `${config.customEmoji.ballFr} \u200b Accédez au serveur en cliquant sur le bouton "Accepter" ci-dessous. Vous affirmez alors avoir pris connaissance des règles et les accepter.`,
		},
	},
	langPrompt: {
		buttonLabel: {
			en: 'English',
			fr: 'Français',
		},
		message: {
			en: `${config.customEmoji.ballEn} \u200b What language do you speak?`,
			fr: `${config.customEmoji.ballFr} \u200b Quelle langue parlez-vous ?`,
		},
	},
};

module.exports = {
	// Command definition to be registered
	data: new SlashCommandBuilder()
		.setDefaultPermission(false)
		.setName('admin')
		.setDescription('Staff restricted commands')
		.addStringOption(option =>
			option.setName('action')
				.setDescription('Command to execute')
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
		let replyEmbed;
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

				replyEmbed = {
					color: 0x5aa264,
					title: commandConfig.rules.message.en,
					description: commandConfig.rules.message.fr,
					
				};

				break;

			/**
			 * Sends the lang roles message and buttons to the roles channel
			 */
			case 'sendLangRolePrompt':
				//replySentence = commandConfig.langPrompt.message.en + '\n\n' + commandConfig.langPrompt.message.fr + '\n\u200b';
				replyChannel = config.channel.roles;

				replyEmbed = {
					color: 0x586aea,
					title: commandConfig.langPrompt.message.en,
					description: commandConfig.langPrompt.message.fr,
				};

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
		interaction.guild.channels.cache.get(replyChannel).send({ embeds: [replyEmbed], components: [row] });
		await interaction.reply({ content: 'Message sent!', ephemeral: true });
		
	},
};