const fs = require('fs');
const Discord = require('discord.js');
const { prefix, psdkAccessChannelName, channelLog } = require('./config.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.username} is ready to manage everything!`)
})

client.on('message', message => {
    if (message.author.bot || message.channel.type === 'dm') return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send('That command do not exist');

        if (command.args && !args.length) {
            let reply = message.channel.send(`You didn't provide any arguments, ${message.author}`)
            if (command.usage) {
                replay += `\nThe proper usage would be: \`${prefix}${command} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command');
            sendError(message, error)
        }

    } else if (message.channel.name === psdkAccessChannelName) {
        const commandName = "accessSDK";
        const command = client.commands.get(commandName);

        if (!command) return message.channel.send('accessSDK command file looks missing');

        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to give access');
            sendError(message, error)
        }
    } else {
        return;
    }
});

// When a new member joins the server
client.on('guildMemberAdd', member => {
    if (member.user.bot) return;

    const channelId = '143824995867557888';
    const channelRules = '360855474284789772';
    const messageFr = `:french_bread: Bienvenue sur le serveur de la communauté **Pokémon Workshop**, <@${member.id}> ! Ici, tu trouveras de quoi **Télécharger et apprendre à utiliser PokémonSDK**, pour créer ton propre **fangame Pokémon**.\nTu pourras aussi discuter du logiciel et rencontrer toute une communauté de fans de Pokémon et de création !\n\n:arrow_forward: Pour accéder au reste du serveur et à la sélection des rôles, lis les <#${channelRules}> , ajoute un :thumbsup: et on est parti ! :arrow_backward:`;
    const messageEn = `:globe_with_meridians: Welcome on the **Pokémon Workshop** server, <@${member.id}> ! Here, you'll be able to **Download & Learn to use PokémonSDK**, in order to create your own **Pokémon fangame**.\nYou'll also find channels to talk about the software, but also with a big Pokémon & Makers community!\n\n:arrow_forward: To access the rest of the server and the role selection, please make sure to read the <#${channelRules}> , add a :thumbsup: and off we go! :arrow_backward:`;
    if (member.user.locale === 'fr') {
        member.guild.channels.cache.get(channelId).send(messageFr);
    } else {
        member.guild.channels.cache.get(channelId).send(messageEn);
    }
    console.log(`${member.user.username} joined the Pokémon Workshop server!`)
});

// When a new member leaves the server
client.on('guildMemberRemove', member => {
    if (member.user.bot) return;

    const channelId = '143824995867557888';
    const message = `:french_bread: ${member.user.username} quitte le serveur ! À bientôt ! :gear:\n\n:globe_with_meridians: ${member.user.username} left the server! See you soon! :gear:`;
    member.guild.channels.cache.get(channelId).send(message);
    console.log(`${member.user.username} left the Pokémon Workshop server!`)
});

function sendError(message, error) {
    message.member.guild.channels.cache.find(channel => channel.name == channelLog).send(
        `RocaBot have a problem with "${message.content}" in <#${message.channel.id}> :\n
        ${error}`
    )
}



if (process.env.BOT_TOKEN) {
    client.login(process.env.BOT_TOKEN);
} // For local dev
else {
    const devConfig = require("./dev-config.json")
    client.login(devConfig.token);
}