/**
 * Gives the 'event' role
 */
const config = require ('../../config.json');
const commandConfig = {
	replySentence: {
		en: `${config.customEmoji.ballEn} \u200b Glad to have you join us!`,
		fr: `${config.customEmoji.ballFr} \u200b Heureux de vous voir vous joindre à nous !`
	},
};

module.exports = {
	id: 'getEventRole',
	execute: (interaction) => {
		let replySentence;

		// add 'event' role
		const eventRole = interaction.member.guild.roles.cache.find(role => role.id = config.role.event);
		interaction.member.roles.add(eventRole);

		const langRoles = config.role.lang;
		const memberLangRoles = interaction.member.roles.cache.filter(function(role) {
			return Object.values(langRoles).includes(role.id);
		});

		console.log(langRoles);
		console.log(memberLangRoles);
		console.log(memberLangRoles.find(role => role.id));

		if (memberLangRoles.size) {
			memberLangRoles.find(role => role.id === config.role.lang.fr) ?
				replySentence = commandConfig.replySentence.fr
				:
				replySentence = commandConfig.replySentence.en
		} else {
			replySentence = commandConfig.replySentence.en
		}

		// let replySentence = commandConfig.replySentence.en + '\n\n' + config.ui.divider + '\n\n' + commandConfig.replySentence.fr;

		interaction.reply({ content: replySentence, ephemeral: true });
	},
};