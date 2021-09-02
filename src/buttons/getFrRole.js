/**
 * Gives the 'fr' role
 */
const config = require ('../../config.json');
const commandConfig = {
	replySentence: 'Bienvenue !',
};

module.exports = {
	id: 'getFrRole',
	execute: (interaction) => {
		// add 'fr' role
		const memberRole = interaction.member.guild.roles.cache.find(role => role.id = config.role.fr);
		interaction.member.roles.add(memberRole);

		interaction.reply({ content: commandConfig.replySentence, ephemeral: true });
	},
};