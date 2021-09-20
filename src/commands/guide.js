/**
 * Sends a button with a link to the guides
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	embed: {
		index: {
			title: {
				en: '🔗  Index of all guides',
				fr: '🔗  Index de tous les guides',
			},
			description: {
				en: 'Browse all the guides on fangame making.',
				fr: 'Parcourez l\'ensemble des guides sur le fangame making.',
			}
		},
		data: {
			abilities: {
				title: {
					en: '🔗  Abilities: database index',
					fr: '🔗  Talents : index de donnés',
				},
				description: {
					en: 'Browse the abilities database index.',
					fr: 'Parcourez l\'index de données des talents.',
				}
			},
			items: {
				title: {
					en: '🔗  Items: database index',
					fr: '🔗  Objets : index de données',
				},
				description: {
					en: 'Browse the items database index.',
					fr: 'Parcourez l\'index de données des objets.',
				}	
			},
			moves: {
				title: {
					en: '🔗  Moves: databases index',
					fr: '🔗  Attaques : index de données',
				},
				description: {
					en: 'Browse the moves database index.',
					fr: 'Parcourez l\'index de données des attaques.',
				}
			},
			pokemon: {
				title: {
					en: '🔗  Pokémon: database index',
					fr: '🔗  Pokémon : index de données',
				},
				description: {
					en: 'Browse the Pokémon database index.',
					fr: 'Parcourez l\'index de données des Pokémon.',
				}
			},
		},
		tutorial: {
			event: {
				title: {
					en: '🔗  Tutorials: Event Making',
					fr: '🔗  Tutoriels : Event Making',
				},
				description: {
					en: 'Learn how to create events with Pokémon SDK.',
					fr: 'Apprenez comment créer des événements avec Pokémon SDK.',
				}
			},
			rubyhost: {
				title: {
					en: '🔗  Tutorials: Ruby Host',
					fr: '🔗  Tutoriels : Ruby Host',
				},
				description: {
					en: 'Learn how to edit your game data with Ruby Host.',
					fr: 'Apprenez à modifier les données de votre jeu avec Ruby Host.',
				}
			},
			tiled: {
				title: {
					en: '🔗  Tutorials: Tiled',
					fr: '🔗  Tutoriels : Tiled',
				},
				description: {
					en: 'Learn how to make maps with Tiled. ',
					fr: 'Apprenez à créer des maps avec Tiled. ',
				}
			}
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
		.setDescription('Get link to the different guides')

		// Subcommand to get access to the index of all guides
		.addSubcommand(subcommand =>
			subcommand
				.setName('index')
				.setDescription('All the guides')
				.addStringOption(option => option.setName('lang').setDescription('Guides language').setRequired(false).addChoices([['fr', 'fr'], ['en', 'en']])))

		// Subcommand to get acccess to the different data types
		.addSubcommand(subcommand =>
			subcommand
				.setName('data')
				.setDescription('Get links to the data indexes')
				.addStringOption(option => option.setName('type').setDescription('Data type').setRequired(true).addChoices([
					['Pokémon', 'pokemon'],
					['Abilities', 'abilities'],
					['Items', 'items'],
					['Moves', 'moves'],
				]))
				.addStringOption(option => option.setName('lang').setDescription('Reply language').setRequired(false).addChoices([['fr', 'fr'], ['en', 'en']])))

		// Subcommand to get access to the tutorials
		.addSubcommand(subcommand =>
			subcommand
				.setName('tutorial')
				.setDescription('Get links to the tutorials')
				.addStringOption(option => option.setName('subject').setDescription('Tutorials subject').setRequired(true).addChoices([
					['Event', 'event'],
					['RubyHost', 'rubyhost'],
					['Tiled', 'tiled'],
				]))
				.addStringOption(option => option.setName('lang').setDescription('Tutorial language').setRequired(false).addChoices([['fr', 'fr'], ['en', 'en']]))),


	// Command action
	async execute(interaction) {

		// Get subcommand and option values
		const lang = interaction.options.getString('lang') || 'en';
		const dataType = interaction.options.getString('type');
		const subject = interaction.options.getString('subject');
		const subcommand = interaction.options.getSubcommand();

		let replyEmbed;

		const button = new MessageButton()
			.setStyle('LINK');
		
		switch (subcommand) {
			case 'index':
				replyEmbed = {
					color: 0x50545b,
					title: commandConfig.embed.index.title[lang],
					description: commandConfig.embed.index.description[lang],
				};


				button.setURL(config.url.guide.index[lang]);
				button.setLabel(commandConfig.buttonLabel.index[lang]);
				break;

			case 'data':
				replyEmbed = {
					color: 0x50545b,
					title: commandConfig.embed.data[dataType].title[lang],
					description: commandConfig.embed.data[dataType].description[lang],
				};

				button.setURL(config.url.guide.data[dataType]);
				button.setLabel(commandConfig.buttonLabel.data[dataType][lang]);
				break;

			case 'tutorial':
				replyEmbed = {
					color: 0x50545b,
					title: commandConfig.embed.tutorial[subject].title[lang],
					description: commandConfig.embed.tutorial[subject].description[lang],
				};

				button.setURL(config.url.guide.tutorial[subject][lang]);
				button.setLabel(commandConfig.buttonLabel.tutorial[subject][lang]);
				break;
		}

		const row = new MessageActionRow()
			.addComponents(button);

		await interaction.reply({ embeds: [replyEmbed], components: [row] });
	},
};