const { bold, userMention, channelMention } = require('@discordjs/builders');
const config = require (__dirname + '/../../config.json');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute: (client, member) => {
		const messageEn = `${bold(`${config.customEmoji.ballEn}  Welcome to the Pokémon Workshop community server, ${userMention(member.id)} !`)}\n`
		+ 'On this server, you\'ll find everything you need to download and learn how to use Pokémon Studio & Pokémon SDK to create your own Pokémon fangame. '
		+ 'You can also discuss the software and your projects, and meet a whole community made out of Pokémon and creation fans!\n\n'
		+ 'Now you can:\n'
		+ `${config.customEmoji.dot} Download Pokémon Studio (including Pokémon SDK) in ${channelMention(config.channel.psdkLinks)}\n`
		+ `${config.customEmoji.dot} Customize your server experience in the "Channels & Roles" section \n`
		+ `${config.customEmoji.dot} Take the time to re-read the ${channelMention(config.channel.rules)}!`;

		const messageFr = `${bold(`${config.customEmoji.ballFr}  Bienvenue sur le serveur de la communauté Pokémon Workshop, ${userMention(member.id)} !`)}\n`
		+ 'Sur ce serveur, tu trouveras de quoi télécharger et apprendre à utiliser Pokémon Studio & Pokémon SDK pour créer ton propre fangame Pokémon. '
		+ 'Tu pourras aussi discuter du logiciel et de tes projets, ainsi que rencontrer toute une communauté de fans de Pokémon et de création !\n\n'
		+ 'Tu peux maintenant :\n'
		+ `${config.customEmoji.dot} Télécharger Pokémon Studio (incluant Pokémon SDK) dans ${channelMention(config.channel.psdkLinks)}\n`
		+ `${config.customEmoji.dot} Personnaliser ton expérience sur le serveur dans la section \"Salons et rôles\" \n`
		+ `${config.customEmoji.dot} Prendre le temps de relire les ${channelMention(config.channel.rules)} !`;

		const finalMessage = messageEn + '\n\n' + config.ui.divider + '\n\n' + messageFr;
		const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === config.channel.welcome);

		welcomeChannel.send({ content: finalMessage });
	},
};