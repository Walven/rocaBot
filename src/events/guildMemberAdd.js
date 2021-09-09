const { userMention, channelMention } = require('@discordjs/builders');
const config = require (__dirname + '/../../config.json');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute: (client, member) => {

		const messageFr = `🥖 Bienvenue sur le serveur de la communauté Pokémon Workshop, ${userMention(member.id)}! Ici, tu trouveras de quoi Télécharger et apprendre à utiliser PokémonSDK, pour créer ton propre fangame Pokémon.\n`
		+ 'Tu pourras aussi discuter du logiciel et rencontrer toute une communauté de fans de Pokémon et de création !\n\n'
		+ `▶️ Pour accéder au reste du serveur et à la sélection des rôles, lis les ${channelMention(config.channel.rules)} , clique sur le bouton et on est parti ! ◀️`;

		const messageEn = `🌐 Welcome to the Pokémon Workshop community server!, ${userMention(member.id)}! Here you'll find the resources to download and learn how to use PokémonSDK, in order to create your very own Pokémon fangame.\n`
		+ 'You\'ll also be able to discuss about the software and meet a whole community made out of Pokémon and creation fans!\n\n'
		+ `▶️ To access the rest of the server and the role selection, read the ${channelMention(config.channel.rules)} , click the button and you'll be ready to go! ◀️`;

		const separator = '❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧✿❁✧';

		const finalMessage = messageFr + '\n\n' + separator + '\n\n' + messageEn;
		const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === config.channel.welcome);
		welcomeChannel.send({ content: finalMessage });
	},
};