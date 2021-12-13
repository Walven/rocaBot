/**
 * Sends welcome channels messages
 */
const { MessageActionRow, MessageButton} = require('discord.js');
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
	psdkAccess: {
		buttonLabel: 'Access to Pokémon SDK download ・ Accéder au téléchargement de Pokémon SDK',
		message: {
			en: `${config.customEmoji.ballEn} \u200b Access the Pokémon SDK download by clicking the "Access" button below.`,
			fr: `${config.customEmoji.ballFr} \u200b Accédez au téléchargement de Pokémon SDK en cliquant sur le bouton "Accéder" ci-dessous.`,
		},
	},
	eventPrompt: {
		buttonLabel: 'I want to participate ・ Je veux participer',
		message: {
			en: `${config.customEmoji.ballEn} \u200b Participate in the Fall Guys eventby clicking the "Access" button below.`,
			fr: `${config.customEmoji.ballFr} \u200b Participer à l'événement Fall Guys en cliquant sur le bouton "Accéder" ci-dessous.`,
		},
	}
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
					['Send PSDK access prompt', 'sendPSDKAccessPrompt'],
					['Send Event prompt', 'sendPSDKAccessPrompt'],
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

			/**
			 * Sends the PSDK access message
			 */
			case 'sendPSDKAccessPrompt':
				replyChannel = config.channel.psdkAccess;
				buttons.push(
					new MessageButton()
						.setCustomId('getPSDKAccess')
						.setLabel(commandConfig.psdkAccess.buttonLabel)
						.setStyle('PRIMARY'),
				);

				replyEmbed = {
					color: 0x586aea,
					title: commandConfig.psdkAccess.message.en,
					description: commandConfig.psdkAccess.message.fr,
				};

				break;
			
			/**
			 * Sends the lang roles message and buttons to the roles channel
			 */
			case 'sendEventPrompt':
				replyChannel = config.channel.bot;

				replyEmbed = {
					color: 0x586aea,
					title: commandConfig.eventPrompt.message.en,
					description: commandConfig.eventPrompt.message.fr,
				};

				buttons.push(
					new MessageButton()
						.setCustomId('getEventRole')
						.setLabel(commandConfig.eventPrompt.buttonLabel)
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