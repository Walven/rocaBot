module.exports = {
	name: 'interactionCreate',
	once: false,
	execute: async (client, interaction) => {
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
	},
};