const fs = require('fs');
const Discord = require('discord.js');
const { prefix, psdkAccessChannelName, channelLog } = require('./config.json')
const config = require('./config.json')

const client = new Discord.Client({
    partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    fetchAllMembers: true
});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Bot ready to go!
client.once('ready', () => {
    console.log(`${client.user.username} is ready to manage everything!`)
})

// COMMANDS

const usersSpamMap = new Map();
const usersSpamContentMap = new Map();

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
        if (usersSpamMap.has(message.author.id)) {
            const messageSpamLimit = 6
            const messageSpamLimitKick = 9

            const userData = usersSpamMap.get(message.author.id);
            let {msgCount} = userData;
            msgCount += 1;
            userData.msgCount = msgCount;
            usersSpamMap.set(message.author.id, userData);

            const userMessageContent = usersSpamContentMap.get(message.author.id);
            let {msgContent} = userMessageContent;
            if (msgCount >= messageSpamLimit) message.delete();
            if (msgCount === messageSpamLimitKick && msgContent != message.content) {
                message.guild.member(message.author.id).kick({reason: 'rocaBot: Kick Anti-Spam'});
                return;
            }
            if (msgCount === messageSpamLimit && msgContent === message.content) {
                message.guild.member(message.author.id).ban({reason: 'rocaBot: Ban Anti-Spam'});
                return;
            }
            msgContent = message.content;
            userMessageContent.msgContent = msgContent;
            usersSpamContentMap.set(message.author.id, userMessageContent);
        } else {
            usersSpamMap.set(message.author.id, {
                msgCount: 1
            });
            usersSpamContentMap.set(message.author.id, {
                msgContent: message.content
            });
            setTimeout(() => {
                usersSpamMap.delete(message.author.id);
            }, 10000);
        }
        return;
    }
});

// EVENTS

// When a new member joins the server
client.on('guildMemberAdd', member => {
    if (member.user.bot) return;

    const channelId = '143824995867557888';
    const channelRules = '360855474284789772';
    const messageFr = `:french_bread: Bienvenue sur le serveur de la communauté **Pokémon Workshop**, <@${member.id}> !\n\nIci, tu trouveras de quoi **Télécharger et apprendre à utiliser PokémonSDK**, pour créer ton propre **fangame Pokémon**.\nTu pourras aussi discuter du logiciel et rencontrer toute une communauté de fans de Pokémon et de création !\n\n:arrow_forward: Pour accéder au reste du serveur et à la sélection des rôles, lis les <#${channelRules}> , ajoute un :thumbsup: et on est parti ! :arrow_backward:`;
    const messageEn = `:globe_with_meridians: Welcome on the **Pokémon Workshop** server, <@${member.id}> !\n\nHere, you'll be able to **Download & Learn to use PokémonSDK**, in order to create your own **Pokémon fangame**.\nYou'll also find channels to talk about the software, but also with a big Pokémon & Makers community!\n\n:arrow_forward: To access the rest of the server and the role selection, please make sure to read the <#${channelRules}> , add a :thumbsup: and off we go! :arrow_backward:`;
    if (member.user.locale === 'fr') {
        member.guild.channels.cache.get(channelId).send(messageFr);
    } else {
        member.guild.channels.cache.get(channelId).send(messageEn);
    }
    console.log(`${member.user.username} joined the Pokémon Workshop server!`)
});

// Add a role when a member reacts to a message
client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    console.log(`Reaction added by ${user.username}. Emoji name: ${reaction.emoji.name}.`);

    if (!reaction.message.guild) return;
    const reactionRoleElem = config.reactionRole[reaction.message.id];
    if (!reactionRoleElem) return;
    const prop = reaction.emoji.id ? 'id' : 'name';
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop]);
    if (emoji) {
        console.log(`Add the ${emoji.roles} role to ${user.username}.`);
        reaction.message.guild.member(user).roles.add(emoji.roles);
    }
});

// Remove a role when a member reacts to a message
client.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return;
    console.log(`Reaction removed by ${user.username}. Emoji name: ${reaction.emoji.name}.`);

    if (!reaction.message.guild) return;
    const reactionRoleElem = config.reactionRole[reaction.message.id];
    if (!reactionRoleElem || !reactionRoleElem.removable) return;
    const prop = reaction.emoji.id ? 'id' : 'name';
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop]);
    if (emoji) {
        console.log(`Remove the ${emoji.roles} role to ${user.username}.`);
        reaction.message.guild.member(user).roles.remove(emoji.roles);
    }
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
