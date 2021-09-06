require('dotenv').config({ path: '../.env' });
const config = require ('../config.json');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Set local commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Set local buttons
client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	client.buttons.set(button.id, button);
}

client.once('ready', async () => {
	console.log('My body is ready!');
	setSlashCommandRights(client);
});

// Handle commands
client.on('interactionCreate', async interaction => {

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	else if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);

		try {
			await button.execute(interaction);
		}
		catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN);

/**
 * Set command rights
 * Slash command rights need to be set after the command has been registered
 * @param {Client} discordClient
 */
async function setSlashCommandRights(discordClient) {
	const registeredCommands = await discordClient.guilds.cache.get(config.guild.id).commands.fetch();
	for (const localCommand of discordClient.commands) {
		if (localCommand.permissions) {
			await registeredCommands.filter(registeredCommand => registeredCommand.name == localCommand.data.name).first()
				.permissions.add({ permissions: localCommand.permissions });
		}
	}
}