/**
 * Gives the 'en' role
 */
const config = require ('../../config.json');
const commandConfig = {
	replySentence: 'Welcome!',
};

module.exports = {
	id: 'getEnRole',
	execute: (interaction) => {
		// add 'en' role
		const memberRole = interaction.member.guild.roles.cache.find(role => role.id = config.role.lang.en);
		interaction.member.roles.add(memberRole);

		interaction.reply({ content: commandConfig.replySentence, ephemeral: true });
	},
};