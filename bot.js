// discord.js allows to interact with the Discord API very easily
const Discord = require("discord.js");
// Creates a 
const client = new Discord.Client();
const dotenv = require("dotenv");

dotenv.config({path: __dirname+"/config.env"});

const replies = [
    "Boop",
    "We don't need the memories",
    "You don’t win alone. That’s just how it is."
]

//var newReplies = replies.map((reply) => reply.toLowerCase());

// Login using BOT TOKEN found in Discord Dev Portal (Application -> Bot -> Token)
client.login(process.env.TOKEN);

// 
client.on("ready", readyDiscord);



client.on("message", function(msg){
    //console.log(msg.content);
    // If the sent text message is === !ping, the bot replies with received 
    if (msg.content === "!ping"){
        let index = Math.floor(Math.random() * replies.length);
        msg.reply(replies[index]);
        //msg.channel.send() can also be used to remove the tags
    }
});

function readyDiscord(){
    console.log("Bot Ready");
}