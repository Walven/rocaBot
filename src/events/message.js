const { bold, userMention, channelMention } = require('@discordjs/builders');
const config = require (__dirname + '/../../config.json');
const { readFileSync } = require('fs');

const NO_KICK_TLDS = ['fr', 'com', 'net', 'eu', 'info', 'org',];
//stolen from https://regexr.com/2rj36
const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = {
	name: 'messageCreate',
	once: false,
	execute: (client, message) => {
        console.log(message.content);
        //Get message urls
        let urls = message.content.match(URL_REGEX);
        
        if (!urls) {
            return;
        }
	},
};