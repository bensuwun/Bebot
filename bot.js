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

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

dotenv.config({path: __dirname+"/.env"});

// Login using BOT TOKEN found in Discord Dev Portal (Application -> Bot -> Token)
client.login(process.env.TOKEN);

client.on("ready", readyDiscord);

client.on("message", function(msg){
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return msg.reply("Invalid command");

    try{
        client.commands.get(command).execute(msg, args);
    }
    catch(error){
        console.error(error);
        msg.reply("There was an error trying to execute that command!");
    }
});

function readyDiscord(){
    console.log("Bot Ready");
}