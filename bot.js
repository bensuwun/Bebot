const fs = require("fs");
const dotenv = require("dotenv");
// const config = require("./config.json");
// extracts the prefix and token variables in module
const {prefix, token} = require("./config.json");

// discord.js allows to interact with the Discord API very easily
const Discord = require("discord.js");
// Creates a Discord client
const client = new Discord.Client();
// Create a Collection/Map
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync(`./commands`);

for (const folder of commandFolders){
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file => file.endsWith(`.js`)));
    for(const file of commandFiles){
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

dotenv.config({path: __dirname+"/.env"});

// Login using BOT TOKEN found in Discord Dev Portal (Application -> Bot -> Token)
client.login(process.env.TOKEN);

client.on("ready", readyDiscord);

client.on("message", function(msg){
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

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

});

function readyDiscord(){
    console.log("Bot Ready");
}