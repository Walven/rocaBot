const Command = require('./command');
var lang = "";
var action = '';

const FR_answers = [
    "C\'est fait.",
    "Et voilà !",
    "C\'est donné !",
    "C'est bon !",
    "Voilà !",
];

const EN_answers = [
    "Done!",
    "Voilà!",
    "You now have access.",
    "We gave you the access!",
    "All right!",
];

const SDK_EN_ID = '697081052232941599';
const SDK_FR_ID = '697081257087074365';
const SDK_OLD = '483746581233926156';

module.exports = class accessSDK extends Command {

    static match(message) {
        if (message.channel.name == "psdk-access") {
            action = 'requestAccess';
            // Check if the author is polite
            if ((/([Hh]ello)|([Hh]i)|([Hh]ey)|([Hh]owdy)|([Bb]onjour)|([Bb]onsoir)|([Ss]alut)|([Cc]oucou)/).test(message.content)) {
                
                // Check if the question is in english
                if ((/(?=.*(([Mm]ay)|([Cc]an)|([Cc]ould)|([Ww]ould)|([Dd]ownload)))(?=.*((access)|(link)|([Pp][Ss][Dd][Kk])|([Ss][Dd][Kk])))/).test(message.content)) {
                    lang = "en"
                    return true
                }

                // Check if the question is in french
                if ((/(?=.*(([Pp]ourrais)|([Vv]oudrais)|([Pp]ossibilit[eé])|([Ss]erait)|([Pp]ossible)|([Aa]urais)|([Aa]voir)|([Pp]uis)|([Pp]ouvez)|([Dd]onne)|(t[éeè]l[éeè]charger)|(t[éeè]l[éeè]charg[éeè])))(?=.*((acc[eèé]s)|(lien)|([Pp][Ss][Dd][Kk])|([Ss][Dd][Kk])))/).test(message.content)) {
                    lang = "fr"
                    return true
                }
            }
        }
        else if (message.channel.name.includes('en-')) {
            lang = 'en';
            action = 'updateRoles';
        }
        else if (message.channel.name.includes('fr-')) {
            lang = 'fr';
            action = 'updateRoles';
        }
    }

    static action(message) {
        if(action === 'requestAccess') {
            this.addRole(message);
        } else if(action === 'updateRoles') {
            this.updateRole(message);
        }
    }

    static addRole(message) {
        let author = message.member
        let answerNb = Math.floor(Math.random()*6)

        if (author.roles.has(SDK_OLD)) {
            if (lang === "fr") {
                var answer = "Tu as déjà les accès ! Tu peux télécharger Pokémon SDK dans <#483747311495938058>."
            }

            if (lang === "en") {
                var answer = "You've already got access! You can download Pokémon SDK in <#483747311495938058>."
            }
        } 
        else {
            message.react("✅")
            author.addRole(SDK_OLD) // For access

            if (lang === "fr") {
                author.addRole(SDK_FR_ID) // For mention
                var answer = FR_answers[answerNb] + " Tu peux télécharger Pokémon SDK dans <#483747311495938058>. " + "(Et n'oublie pas de télécharger les ressources dans <#484069458206392331> !)"
            }

            if (lang === "en") {
                author.addRole(SDK_EN_ID) // For mention
                var answer = EN_answers[answerNb] + " You can download Pokémon SDK in <#483747311495938058>. " + "(Don't forget to download the resources in <#484069458206392331>!)"
            }
        }

        message.channel.send(author + " " + answer);
    }

    static updateRole(message) {
        let author = message.member;

        if (author.roles.has(SDK_OLD)) {
            if (lang === 'en' && !author.roles.has(SDK_EN_ID)) {
                author.addRole(SDK_EN_ID) // For mention
                message.channel.send(author + " Your role has been updated, you'll now receive english notifications.");
            }

            if (lang === 'fr' && !author.roles.has(SDK_FR_ID)) {
                author.addRole(SDK_FR_ID) // For mention
                message.channel.send(author + " Ton rôle a été mis à jour et tu recevera désormais les notifications française.");
            }
        }
    }
}
