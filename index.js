require('dotenv').config();
const config = require ('./config.json');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('My body is ready!');
	setSlashCommandRights(client);
});

// Handle commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);

/**
 * Set command rights
 * @param {Client} discordClient
 */
async function setSlashCommandRights(discordClient) {
	// Admin command
	const adminCommand = await discordClient.guilds.cache.get(config.guild.id).commands.fetch('881982185308049408');
	await adminCommand.permissions.add({ permissions: [{ id: config.role.staff, type: 'ROLE', permission: true }] });
}