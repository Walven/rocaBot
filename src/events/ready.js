const config = require (__dirname + '/../../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute: (client) => {
		console.log('My body is ready!');
		setSlashCommandRights(client);
	},
};

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