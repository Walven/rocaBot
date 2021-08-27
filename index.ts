import { Interaction } from "discord.js";

import dotenv from 'dotenv';
import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import command from "./commands/types/command";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const command: command = require(`./commands/${file}`);
	commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('My body is ready!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;
	interaction.applicationId
	const command = commands.get(interaction.commandName) as command;

	if (!command) return;

	try {
		command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);