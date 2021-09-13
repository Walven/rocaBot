/**
 * Use to get all slash commands ids
 */
require('dotenv').config();
const config = require ('./config.json');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
console.log('Getting commands...');

client.once('ready', async () => {
	const commands = await client.guilds.cache.get(config.guild.id).commands.fetch();
	commands.forEach(command => console.log(`command "${command.name}": ${command.id}`));
	client.destroy();
});

client.login(process.env.TOKEN);
