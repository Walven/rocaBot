const { readFileSync } = require('fs');
const os = require('os');

//stolen from https://regexr.com/2rj36
const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = {
	name: 'messageCreate',
	once: false,
	execute: (client, message) => {        
        //Check for unkickable roles
        const userRoles = message.member.roles.cache;
        let userIsStaff = false;
        userRoles.forEach(role => {
            if (role.name === 'staff') {
                userIsStaff = true;
            }
        });
         if (userIsStaff) return;

        let messageUrls = message.content.match(URL_REGEX);
        if (!messageUrls) return;
        
        const allowedUrls = readFileSync(__dirname + '/message/url_whitelist.txt', 'utf-8').split(os.EOL);
        const deniedMessageUrls = messageUrls.filter(messageUrl => !allowedUrls.includes(messageUrl));
    
        const allowedTlds = readFileSync(__dirname + '/message/tld_whitelist.txt', 'utf-8').split(os.EOL);
        const deniedMessageTlds = messageUrls.filter(messageUrl => !allowedTlds.includes(messageUrl.split('.').pop()));

        if (deniedMessageTlds.length) {
            message.member.kick(`Posted link with invalid tld ${deniedMessageTlds.join(', ')}`);
        }
        if (deniedMessageUrls.length) {
            message.delete().catch(console.error);
        }
	},
};