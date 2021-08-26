/**
 * Sends a button with a link to the guides
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../config.json');

// Local config
const commandConfig = {
	replySentence: {
		index: {
			en: 'Here\'s the index of all guides',
			fr: 'Voici le lien vers les guides',
		},
		data: {
			pokemon: {
				en: 'Here\'s the link to the Pokémon data list',
				fr: 'Voici le lien vers la liste des données des Pokémon',
			},
			abilities: {
				en: 'Here\'s the link to the abilities data list',
				fr: 'Voici le lien vers la liste des données des talents',
			},
			items: {
				en: 'Here\'s the link to the items data list',
				fr: 'Voici le lien vers la liste des données des objets',
			},
			moves: {
				en: 'Here\'s the link to the moves data list',
				fr: 'Voici le lien vers la liste des données des attaques',
			},
		},
		tutorial: {
			event: {
				en: 'Here\'s the link to the event making tutorials',
				fr: 'Voici le lien vers les tutoriels d\'event making',
			},
			rubyhost: {
				en: 'Here\'s the link to the RubyHost tutorials',
				fr: 'Voici le lien vers les tutoriels RubyHost',
			},
			tiled: {
				en: 'Here\'s the link to the Tiled tutorials',
				fr: 'Voici le lien vers les tutoriels Tiled',
			},
		},
	},
	buttonLabel: {
		index: {
			en: 'Access guides',
			fr: 'Accéder aux guides',
		},
		data: {
			pokemon: {
				en: 'Access the Pokémon data',
				fr: 'Accéder aux données des Pokémon',
			},
			abilities: {
				en: 'Access the abilities data',
				fr: 'Accéder aux données des talents',
			},
			items: {
				en: 'Access the items data',
				fr: 'Accéder aux données des objets',
			},
			moves: {
				en: 'Access the moves data',
				fr: 'Accéder aux données des attaques',
			},
		},
		tutorial: {
			event: {
				en: 'Access the event making tutorials',
				fr: 'Accéder aux tutoriels d\'event making',
			},
			rubyhost: {
				en: 'Access the RubyHost tutorials',
				fr: 'Accéder aux tutoriels RubyHost',
			},
			tiled: {
				en: 'Access the Tiled tutorials',
				fr: 'Accéder aux tutoriels Tiled',
			},
		},
	},
};

module.exports = {
	// Build slash command
	data: new SlashCommandBuilder()
		.setName('guide')
		.setDescription('Get link to the guides')

		// Subcommand to get access to the index of all guides
		.addSubcommand(subcommand =>
			subcommand
				.setName('index')
				.setDescription('Guide index')
				.addStringOption(option => option.setName('lang').setDescription('guide language').setRequired(true).addChoices([['fr', 'fr'], ['en', 'en']])))

		// Subcommand to get acccess to the different data types
		.addSubcommand(subcommand =>
			subcommand
				.setName('data')
				.setDescription('See data types')
				.addStringOption(option => option.setName('type').setDescription('data type').setRequired(true).addChoices([
					['Pokémon', 'pokemon'],
					['Abilities', 'abilities'],
					['Items', 'items'],
					['Moves', 'moves'],
				]))
				.addStringOption(option => option.setName('lang').setDescription('answer language').setRequired(true).addChoices([['fr', 'fr'], ['en', 'en']])))

		// Subcommand to get access to the tutorials
		.addSubcommand(subcommand =>
			subcommand
				.setName('tutorial')
				.setDescription('Get links to tutorials')
				.addStringOption(option => option.setName('subject').setDescription('tutorial subject').setRequired(true).addChoices([
					['Event', 'event'],
					['RubyHost', 'rubyhost'],
					['Tiled', 'tiled'],
				]))
				.addStringOption(option => option.setName('lang').setDescription('answer language').setRequired(true).addChoices([['fr', 'fr'], ['en', 'en']]))),


	// Command action
	async execute(interaction) {

		// Get subcommand and option values
		const lang = interaction.options.getString('lang');
		const dataType = interaction.options.getString('type');
		const subject = interaction.options.getString('subject');
		const subcommand = interaction.options.getSubcommand();

		const button = new MessageButton()
			.setStyle('LINK');
		let replySentence;

		switch (subcommand) {
		case 'index':
			replySentence = commandConfig.replySentence.index[lang];
			button.setURL(config.url.guide.index[lang]);
			button.setLabel(commandConfig.buttonLabel.index[lang]);
			break;

		case 'data':
			replySentence = commandConfig.replySentence.data[dataType][lang];
			button.setURL(config.url.guide.data[dataType]);
			button.setLabel(commandConfig.buttonLabel.data[dataType][lang]);
			break;
		case 'tutorial':
			replySentence = commandConfig.replySentence.tutorial[subject][lang];
			button.setURL(config.url.guide.tutorial[subject]);
			button.setLabel(commandConfig.buttonLabel.tutorial[subject][lang]);
			break;
		}

		const row = new MessageActionRow()
			.addComponents(button);

		await interaction.reply({ content: replySentence, components: [row] });
	},
};