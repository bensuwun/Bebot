const { prefix } = require(`../../config.json`);

module.exports = {
    name: `help`,
    description: `List all of my comands or info about a specific command`,
    aliases: [`commands`],
    usage: `[command name]`,
    cooldown: 5,
    execute(message, args){
        message.reply(`This command has not been implemented yet`);
    }
}