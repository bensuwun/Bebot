const Discord = require(`discord.js`);

module.exports = {
    name: `clickButton`,
    async execute(button){
        if(button.id === `create-embed`){
            var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Server Details`)
                .setAuthor(`Bebot`)
                .addFields(
                    { name: `Server Name`, value: `${button.guild.name}`, inline: true },
                    { name: `Member Count`, value: `${button.guild.memberCount}`, inline: true },
                    { name: `Server Region`, value: `${button.guild.region}`, inline: true},
                    { name: `\u200B`, value: `\u200B`}
                )
                .setFooter(`Requested by: ${button.clicker.user.username}`)
    
                .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            
            await button.reply.send(embed);
                
        }
        else if (button.id === `zero-two`){
            console.log(button.guild)
            await button.reply.send(`Check console`);
        }

        else{
            await button.reply.send(`No event handler for this button yet`);
        }
        
    }
}