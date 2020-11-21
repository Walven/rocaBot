const { url, doc } = require("../config.json");

const docUrl = url.psdk + url.doc.prefix;


module.exports = {
    name: 'doc',
    description: 'Create a link to the doc',
    args: false,
    usage: "!doc <en: Default | fr>",
    execute(message, args) {
        switch(args[0]){
            case 'fr':
            message.channel.send(doc.frSentence + docUrl);
            break;  
            case 'en':
            message.channel.send(doc.enSentence + docUrl);
            break;
            case undefined:
            case null:
            if(message.channel.name.startsWith("fr-")){
                message.channel.send(doc.frSentence + docUrl);
            } else {
                message.channel.send(doc.enSentence + docUrl);
            }
            break;
            default:
            message.channel.send('Bad arguments the usage of the command is : ' + this.usage);
            break;              
        }
    }
}