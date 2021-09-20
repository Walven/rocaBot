/**
 * Gives the 'SDK' role
 */
const { channelMention } = require('@discordjs/builders');
const config = require ('../../config.json');
const commandConfig = {
	replySentence: {
		en: `${config.customEmoji.ballEn} \u200b You now have access to the Pokémon SDK download! \n\nCheck ${channelMention(config.channel.psdkLinks)}.`,
		fr: `${config.customEmoji.ballFr} \u200b Vous avez maintenant accès au téléchargement de Pokémon SDK ! \n\nRendez vous dans ${channelMention(config.channel.psdkLinks)}.`
	},
};

module.exports = {
	id: 'getPSDKAccess',
	execute: (interaction) => {
		let replySentence;

		// add 'SDK' role
		const sdkRole = interaction.member.guild.roles.cache.find(role => role.id = config.role.sdk);
		interaction.member.roles.add(sdkRole);

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