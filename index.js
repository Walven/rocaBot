const fs = require('fs');
const Discord = require('discord.js');
const { prefix, psdkAccessChannelName, psdkRoleName } = require('./config.json')

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
    console.log('rocaBot is ready to manage everything')
})

client.on('message', message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return message.channel.send('That command do not exist');
        
        if (command.args && !args.length) {
            let reply =  message.channel.send(`You didn't provide any arguments, ${message.author}`)
            if (command.usage) {
                replay += `\nThe proper usage would be: \`${prefix}${command} ${command.usage}\``;
            }
            
            return message.channel.send(reply);
        }
        
        try{
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command');
        }
        
    }
    else if(message.channel.name === psdkAccessChannelName) {
        const commandName = "accessSDK";
        const command = client.commands.get(commandName);
        
        if (!command) return message.channel.send('accessSDK command file looks missing');
        
        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to give access');
        }
    }
    else if(message.channel.name.startsWith("fr-") && message.member.roles.cache.some(role => role.name === psdkRoleName.old)){
        const commandName = "accessSDK";
        const command = client.commands.get(commandName);
        
        if (!command) return message.channel.send('accessSDK command file looks missing');
        
        try {
            command.updateRoles(message, 'fr');
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to give access');
        }
    }
    else if(message.channel.name.startsWith('en-') && message.member.roles.cache.some(role => role.name === psdkRoleName.old)){
        const commandName = "accessSDK";
        const command = client.commands.get(commandName);
        
        if (!command) return message.channel.send('accessSDK command file looks missing');
        
        try {
            command.updateRoles(message, 'en');
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to give access');
        }
    }
    else {
        return;
    }
});

if (process.env.BOT_TOKEN) {
    client.login(process.env.BOT_TOKEN);
} // For local dev
else {
    const devConfig = require("./dev-config.json")
    client.login(devConfig.token);
}