const Command = require('./command')
var lang = ""

FR_answers = [
    "Fait, les liens sont dans les channels en bas. :)",
    "Nous t\'avons donné le rôle, tu as maintenant accès aux liens. :)",
    "C\'est fait, les liens sont dans les channels du bas.",
    "Nous nous en sommes occupés, tu as le rôle. :)",
    "C\'est fait, tu trouveras les liens plus bas dans les salons.",
    "Voilà, c\'est donné ! Les liens sont dans les channels du bas.",
    "C'est tout bon ! Tu peux trouver ce qu'il te faut dans les channels en bas.",
    "C'est bon ! Tu as tout ce qu'il te faut dans les salons tout en bas",
    "C'est fait, tu as maintenant accès aux channels contenant les liens.",
    "Tu peux maintenant accéder aux liens, ils sont dans les channels du bas. :)"
]

EN_answers = [
    "Hey! You have now access to the lower channels. :)",
    "Done, in the last section!",
    "Voilà, links are in the channel below! :)",
    "Done, you have now access to PSDK on the lower channels. :)",
    "You can now download everything you need in the bottom channels",
    "You can now access the channels at the bottom. :)",
    "We gave you the access! Links are in the channel below.",
    "You have now access to PSDK. Go to the bottom channels. :)",
    "Done! Check the new channels at the bottom. :)",
    "Done, you have now access to the lower channels to download PSDK!"
]

module.exports = class accessSDK extends Command{

    static match(message) {
        if (message.channel.name == "access_psdk") {
            
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
        let answerNb = Math.floor(Math.random()*(9-0+1)+0)

        message.react("✅")
        author.addRole('483746581233926156')

        if (lang === "fr") {
            var answer = FR_answers[answerNb]
        }

        if (lang === "en") {
            var answer = EN_answers[answerNb]
        }

        message.channel.send(author + " " + answer);
    }

}