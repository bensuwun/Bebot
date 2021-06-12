// discord.js allows to interact with the Discord API very easily
const Discord = require("discord.js");
// Creates a Discord client
const client = new Discord.Client();
const dotenv = require("dotenv");

// const config = require("./config.json");
// extracts the prefix and token variables in module
const {prefix, token} = require("./config.json");


dotenv.config({path: __dirname+"/.env"});
//dotenv.config();        // default path name

const replies = [
    "Boop",
    "We don't need the memories",
    "You don’t win alone. That’s just how it is."
]

// var newReplies = replies.map((reply) => reply.toLowerCase());

// Login using BOT TOKEN found in Discord Dev Portal (Application -> Bot -> Token)
client.login(process.env.TOKEN);

client.on("ready", readyDiscord);

client.on("message", function(msg){
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping"){
        let index = Math.floor(Math.random() * replies.length);
        //msg.reply(replies[index]);
        //msg.channel.send() can also be used to remove the tags
        msg.channel.send(replies[index]);
    }
    else if (command === "server"){
        msg.channel.send(`Server name: ${msg.guild.name}\nServer region: ${msg.guild.region}`);
    }
    else if(command === "args-info"){
        if(!args.length){
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}`);
        }
        else if(args[0] === `foo`){
            return msg.channel.send(`bar`);
        }
        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
    else if (command === `kick`){
        if(!msg.mentions.users.size){
            return msg.reply("No users mentioned");
        }

        const taggedUser = msg.mentions.users.first();
        //console.log(msg.mentions.users.every());
        msg.channel.send(`You wanted to kick: ${taggedUser}`);
    }
    else if (command === `avatar`){
        if(!msg.mentions.users.size){
            return msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL({format: "png", dynamic: true})}`)
        }
        const avatarList = msg.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({format: `png`, dynamic: true})}`;
        })
        
        msg.channel.send(avatarList);
    }
    else if (command === `prune`){
        const amount = parseInt(args[0]);

        if (isNaN(amount)){
            return msg.reply(`That doesn't seem to be a valid number`);
        }
        
        msg.channel.bulkDelete(amount, true).catch(err =>{
            console.error(err);
            msg.channel.send("There was an error trying to prune messages in this channel");
        });
    }
});

function readyDiscord(){
    console.log("Bot Ready");
}