/**
 * Run this file to register slash commands to the guild
 */
import dotenv from 'dotenv';
dotenv.config()
import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

// Read command files
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));
for (const file of commandFiles) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Register the commands
const rest = new REST({ version: '9' }).setToken(TOKEN);
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();