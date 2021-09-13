/**
 * Run this file to register slash commands to the guild
 */
require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENT_ID, TOKEN } = process.env;
const config = require('./config.json');

const guildId = config.guild.id;

// Read command files
const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}

// Register the commands
const rest = new REST({ version: '9' }).setToken(TOKEN);
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();