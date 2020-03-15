const Command = require('./command')

module.exports = class accessSDK extends Command {

    static match(message) {
        return message.content.match("!add(psp|PSP)")
    }

    static action(message) {

        if (message.member.roles.has('220155961292095498') || message.member.roles.has('661335599181070381')) {
            if (message.mentions.members.first() == null) {
                message.channel.send(message.member + " La commande nécessite une mention Discord de l'utilisateur.");
            }
            else {
                let memberToAdd = message.mentions.members.first()

                if (memberToAdd.roles.has('661335416812732450')) {
                    message.channel.send(message.member + " Cet utilisateur possède déjà les accès nécessaires.");
                } 
                else {
                    message.react("✅")
                    memberToAdd.addRole('661335416812732450')
                }
            }
        } 
        else {
            message.channel.send(message.member + " Vous n'avez pas les droits nécéssaires pour effectuer cette commande.");
        }
    }
}