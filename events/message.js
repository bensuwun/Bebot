const {prefix, token} = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: `message`,
    execute(msg, client){
        if(!msg.content.startsWith(prefix) || msg.author.bot) return;

        // Parsing the command and arguments
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Get the command object if existing in commands folder
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return msg.reply(`Invalid command`);

        if(command.args && !args.length){
            let reply = `You didn't provide any arguments!`;
            if(command.usage){
                reply += `\nFormat: \`${prefix}${command.name} ${command.usage}\``;
            }

            return msg.reply(reply);
        }

        // Cooldown
        const { cooldowns } = client;

        if (!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        // If user already used command before
        if(timestamps.has(msg.author.id)){
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
            if(now < expirationTime){
                const timeLeft = (expirationTime - now) / 1000;
                return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command`);
            }
        }

        timestamps.set(msg.author.id, now);
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
        // End cooldown


        try{
            command.execute(msg, args);
        }
        catch(error){
            console.error(error);
            msg.reply("There was an error trying to execute that command!");
        }
    }
}