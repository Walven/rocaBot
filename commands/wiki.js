const { url, wiki } = require("../config.json");

const wikiUrl = url.psdk + url.wiki.prefix;


module.exports = {
    name: 'wiki',
    description: 'Create a link to the wiki',
    args: true,
    usage: "!wiki <en | fr>",
    execute(message, args) {
        switch(args[0]){
            case 'fr':
            message.channel.send(wiki.frSentence + wikiUrl + url.wiki.frPrefix + url.wiki.main);
            break;  
            case 'en':
            message.channel.send(wiki.enSentence + wikiUrl + url.wiki.enPrefix + url.wiki.main);
            break;
            default:
            message.channel.send('Bad arguments the usage of the command is : ' + this.usage);
            break;              
        }
    }
}