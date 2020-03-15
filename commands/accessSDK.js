const Command = require('./command')
var lang = ""

FR_answers = [
    "C\'est fait.",
    "Et voilà !",
    "C\'est donné !",
    "C'est bon !",
    "Voilà !"
]

EN_answers = [
    "Done!",
    "Voilà!",
    "You now have access.",
    "We gave you the access!",
    "All right!"
]

module.exports = class accessSDK extends Command {

    static match(message) {
        if (message.channel.name == "psdk-access") {
            
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
    }

    static action(message) {
        let author = message.member
        let answerNb = Math.floor(Math.random()*6)

        if (author.roles.has('483746581233926156')) {
            if (lang === "fr") {
                var answer = "Tu as déjà les accès ! Tu peux télécharger Pokémon SDK dans <#483747311495938058>."
            }

            if (lang === "en") {
                var answer = "You've already got access! You can download Pokémon SDK in <#483747311495938058>."
            }
        } 
        else {
            message.react("✅")
            author.addRole('483746581233926156')

            if (lang === "fr") {
                var answer = FR_answers[answerNb] + " Tu peux télécharger Pokémon SDK dans <#483747311495938058>. " + "(Et n'oublie pas de télécharger les ressources dans <#484069458206392331> !)"
            }

            if (lang === "en") {
                var answer = EN_answers[answerNb] + " You can download Pokémon SDK in <#483747311495938058>. " + "(Don't forget to download the resources in <#484069458206392331>!)"
            }
        }

        message.channel.send(author + " " + answer);
    }

}