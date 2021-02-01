const { psdkRoleName, psdkDownloadChannelName, psdkAccessChannelName, psdkRessourcesChannelName } = require('../config.json');
const FR_answers = [
    "C\'est fait. ",
    "Et voilà ! ",
    "C\'est donné ! ",
    "C'est bon ! ",
    "Voilà ! ",
];

const EN_answers = [
    "Done! ",
    "Voilà! ",
    "You now have access. ",
    "We gave you the access! ",
    "All right! ",
];

const PoliteAnswer = `\n:flag_gb: : Be polite and our cute Roca will answer you \n:flag_fr: : Sois polis et notre mignon Roca va te répondre`

/**
 * Manage to detect if the user deserved to receive the role from Roca !
 */
module.exports = {
    name: 'accessSDK',
    description: 'Give SDK roles',
    args: false,
    // Give SDK Roles in psdk-access channel
    execute(message) {
        let lang = null;
        let answer;
        const answerNb = Math.floor(Math.random() * 5)

        //Check if the author is polite
        if ((/([Hh]ello)|([Hh]i)|([Hh]ey)|([Hh]owdy)|([Bb]onjour)|([Bb]onsoir)|([Ss]alut)|([Cc]oucou)/).test(message.content)) {

            // Check if the question is in english
            if ((/(?=.*(([Mm]ay)|([Cc]an)|([Cc]ould)|([Ww]ould)|([Dd]ownload)))(?=.*((access)|(link)|([Pp][Ss][Dd][Kk])|([Ss][Dd][Kk])))/).test(message.content)) {
                lang = 'en'
            }

            // Check if the question is in french
            if ((/(?=.*(([Pp]ourrais)|([Vv]oudrais)|([Pp]ossibilit[eé])|([Ss]erait)|([Pp]ossible)|([Aa]urais)|([Aa]voir)|([Pp]uis)|([Pp]ouvez)|([Dd]onne)|(t[éeè]l[éeè]charger)|(t[éeè]l[éeè]charg[éeè])))(?=.*((acc[eèé]s)|(lien)|([Pp][Ss][Dd][Kk])|([Ss][Dd][Kk])))/).test(message.content)) {
                lang = 'fr'
            }

            if (message.member != null) {
                const oldRole = (message.member.guild.roles.cache.find(role => role.name === psdkRoleName.old));
                const frRole = (message.member.guild.roles.cache.find(role => role.name === psdkRoleName.fr));
                const enRole = (message.member.guild.roles.cache.find(role => role.name === psdkRoleName.en));
                const downloadChannel = message.member.guild.channels.cache.find(channel => channel.name == psdkDownloadChannelName);
                const ressourceChannel = message.member.guild.channels.cache.find(channel => channel.name == psdkRessourcesChannelName);

                // Check if the user already have the roles
                if (message.member.roles.cache.some(role => role.name === psdkRoleName.old)) {
                    switch (lang) {
                        case "fr":
                            answer = `Tu as déjà les accès ! Tu peux télécharger Pokémon SDK dans <#${downloadChannel.id}>.`
                            break;
                        case "en":
                            answer = `You've already got access! You can download Pokémon SDK in <#${downloadChannel.id}>.`
                            break;
                        default:
                            answer = PoliteAnswer
                            message.react("❌")
                            break;
                    }
                } else {
                    switch (lang) {
                        case "fr":
                            message.member.roles.add([frRole, oldRole]) // For mention
                            answer = FR_answers[answerNb] + `Tu peux télécharger Pokémon SDK dans <#${downloadChannel.id}>. (Et n'oublie pas de télécharger les ressources dans <#${ressourceChannel.id}> !)`
                            message.react("✅")
                            break;
                        case "en":
                            message.member.roles.add([enRole, oldRole]) // For mention
                            answer = EN_answers[answerNb] + `You can download Pokémon SDK in <#${downloadChannel.id}>. (Don't forget to download the resources in <#${ressourceChannel.id}>!)`
                            message.react("✅")
                            break;
                        default:
                            answer = PoliteAnswer
                            message.react("❌")
                            break;
                    }
                }
                message.channel.send(`${message.member} ${answer}`);
            } else {
                message.channel.send("Something went wrong with the last message")
            }
        }
    }
};