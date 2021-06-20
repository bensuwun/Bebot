const fs = require("fs");
const dotenv = require("dotenv");
// const config = require("./config.json");
// extracts the prefix and token variables in module
const {prefix, token} = require("./config.json");

// discord.js allows to interact with the Discord API very easily
const Discord = require("discord.js");
// Creates a Discord client
const client = new Discord.Client();

require('discord-buttons')(client);
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

const eventFiles = fs.readdirSync(`./events`);

for (const file of eventFiles){
    const event = require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, client));
    }
    else{
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

dotenv.config({path: __dirname+"/.env"});

// Login using BOT TOKEN found in Discord Dev Portal (Application -> Bot -> Token)
client.login(process.env.TOKEN);