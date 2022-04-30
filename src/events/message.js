const { bold, userMention, channelMention } = require('@discordjs/builders');
const config = require (__dirname + '/../../config.json');
const { readFileSync } = require('fs');
const os = require('os');

const NO_KICK_TLDS = ['fr', 'com', 'net', 'eu', 'info', 'org',];
//stolen from https://regexr.com/2rj36
const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = {
	name: 'messageCreate',
	once: false,
	execute: (client, message) => {
        console.log(message.content);
        //Get message urls
        let messageUrls = message.content.match(URL_REGEX);
        
        if (!messageUrls) {
            return;
        }

        const allowedUrls = readFileSync(__dirname + '/message/url_whitelist.txt', 'utf-8').split(os.EOL);
        const deniedMessageUrls = messageUrls.filter(messageUrl => !allowedUrls.includes(messageUrl));

        if (!deniedMessageUrls) {
            return;
        }

        const allowedTlds = readFileSync(__dirname + '/message/tld_whitelist.txt', 'utf-8').split(os.EOL);
        const deniedMessageTlds = messageUrls.filter(messageUrl => !allowedTlds.includes(messageUrl.split('.').pop()));

        console.log(deniedMessageTlds);

        if (deniedMessageTlds) {
            //kick person
        }

        if (deniedMessageUrls) {
            //remove message
        }

        
	},
};