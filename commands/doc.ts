/**
 * Sends a button with a link to the documentation
 */
import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import command from "./types/command";
import { MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

// Global config
import config from '../config.json';


// Local config
const commandConfig = {
	replySentence: {
		en: 'Here\'s the link to the documentation',
		fr: 'Voici le lien vers la documentation',
	},
	buttonLabel: {
		en: 'Access the documentation',
		fr: 'Accéder à la documentation',
	},
};

const command: command = {
	// Build slash command
	data: new SlashCommandBuilder()
		.setName('doc')
		.setDescription('Get link to the documentation')
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('lang')
				.setDescription('Choose reply language')
				.setRequired(false)
				.addChoice('fr', 'fr')
				.addChoice('en', 'en')),

	// Command action
	async execute(interaction: CommandInteraction) {
		const lang = interaction.options.getString('lang');
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(config.url.documentation)
					.setLabel(commandConfig.buttonLabel[lang || 'fr']),
			);
		await interaction.reply({ content: commandConfig.replySentence[lang || 'fr'], components: [row] });
	}
}

module.exports = command;