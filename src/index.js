require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

// Set local commands
client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Set local buttons
client.buttons = new Collection();
const buttonFiles = fs.readdirSync(__dirname + '/buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
	const button = require(__dirname + `/buttons/${file}`);
	client.buttons.set(button.id, button);
}

// Event handling
const eventFiles = fs.readdirSync(__dirname + '/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(__dirname + `/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(process.env.TOKEN);
