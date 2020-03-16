module.exports = class RegexUtil {

    /**
     * To parse a command as args
     * @param {*} startArgChar starting character of the argument example - for help -foo -nar
     * @param {*} text text to parse
     * @param {boolean} hide if character need to be hided
     * @returns arguments as a String array
     */
    static getArgs(startArgChar, text, hide) {
        hide = arguments[3] || true;

        let args = text.match(new RegExp(
            "([" + startArgChar + "]+)(\\w+)", "g"
        ));

        // Remove catching char
        if (hide && !!args) {
            for (let i = 0; i < args.length; i++) {
                args[i] = args[i].substring(startArgChar.length);
            }
        }

        return args;
    }
}