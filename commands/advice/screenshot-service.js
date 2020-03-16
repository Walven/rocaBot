const Translation = require("../../util/translation");

module.exports = class ScreenshotService {

    static messages = {
        fr: Translation.FR.ADVICE.SCREENSHOT.MESSAGE,
        en: Translation.EN.ADVICE.SCREENSHOT.MESSAGE
    }

    static sendMessage(message, lang) {
        message.channel.send(!!message.mentions.members.first() ?
                message.mentions.members.first() + ", " + this.messages[lang] :
                this.messages[lang])
            .then(msg => {
                message.delete();
            })
            .catch(error => { console.error('!advice screenshot : Something went wrong - ' + error) });
    }
}