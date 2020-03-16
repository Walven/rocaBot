const RegexUtil = require('../../util/regexUtil');
const ScreenshortService = require('./screenshot-service');

module.exports = class AdviceService {
    static helpString = "Bad arguments : !advice | !howto | !hwt [screenshot] -[fr|en]";
    static languages = ['fr', 'en'];

    static action(message, args) {

        const subargs = RegexUtil.getArgs("-", message.content);
        // Compate if subargs elements are in languages
        let lang = this.languages.find(e => subargs.includes(e)) || 'fr';

        switch (args[0]) {
            case 'screenshot':
            case 'sh':
                ScreenshortService.sendMessage(message, lang);
                break;
            default:
                message.channel.send(this.helpString);
        }
    }

    static sendLangArgError(message) {
        message.channel.send(message.author + 'Bad arguments : use !advise help');
    }
}