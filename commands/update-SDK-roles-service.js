const SDK_EN_ID = '697081052232941599';
const SDK_FR_ID = '697081257087074365';
const SDK_ACCESS = '483746581233926156';

module.exports = class UpdateSDKRolesService {
    static action(message) {
        if (message.member.roles.has('220155961292095498') || message.member.roles.has('661335599181070381')) {
            members = message.guild.roles.get(SDK_ACCESS).members;
            members.forEach(member => {
                if (member.roles.has(SDK_ACCESS) && !(member.roles.has(SDK_FR_ID) || (member.roles.had(SDK_EN_ID)))) {
                    if (member.user.locale.includes('fr')) {
                        member.addRole(SDK_FR_ID);
                    } else {
                        member.addRole(SDK_EN_ID);
                    }
                }
            })
        }
    }
}