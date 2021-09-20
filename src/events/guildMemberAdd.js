const { bold, userMention, channelMention } = require('@discordjs/builders');
const config = require (__dirname + '/../../config.json');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute: (client, member) => {

		const messageEn = `${bold(`${config.customEmoji.ballEn}  Welcome to the Pokémon Workshop community server, ${userMention(member.id)}!`)}\n`
		+ 'Here you\'ll find the resources to download and learn how to use PokémonSDK, in order to create your very own Pokémon fangame. '
		+ 'You\'ll also be able to discuss about the software and meet a whole community made out of Pokémon and creation fans!\n\n'
		+ `▶️  To access the rest of the server and the role selection, read the rules in ${channelMention(config.channel.rules)}, agree with them and you'll be ready to go!`;

		const messageFr = `${bold(`${config.customEmoji.ballFr}  Bienvenue sur le serveur de la communauté Pokémon Workshop, ${userMention(member.id)} !`)}\n`
		+ 'Ici, tu trouveras de quoi Télécharger et apprendre à utiliser PokémonSDK, pour créer ton propre fangame Pokémon. '
		+ 'Tu pourras aussi discuter du logiciel et rencontrer toute une communauté de fans de Pokémon et de création !\n\n'
		+ `▶️  Pour accéder au reste du serveur et à la sélection des rôles, lis les règles dans ${channelMention(config.channel.rules)}, accepte-les et on est parti !`;

		const finalMessage = messageEn + '\n\n' + config.ui.divider + '\n\n' + messageFr;
		const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === config.channel.welcome);

		welcomeChannel.send({ content: finalMessage });
	},
};