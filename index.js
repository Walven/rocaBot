const Discord = require('discord.js')
const bot = new Discord.Client()

const accessSDK = require('./commands/accessSDK')
const addPSP = require('./commands/addPSP')

bot.on('message', function (message) {
    accessSDK.parse(message)
    addPSP.parse(message)
});

bot.login(process.env.BOT_TOKEN);

