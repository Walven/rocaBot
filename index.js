const Discord = require('discord.js')
const bot = new Discord.Client()

const accessSDK = require('./commands/accessSDK')

bot.on('ready', function (){
    bot.user.setActivity('garder l\'entrée').catch(console.error)
})

bot.on('message', function (message) {
    accessSDK.parse(message)
});

bot.login(process.env.BOT_TOKEN);

