const Discord = require(`discord.js`);
const { MessageButton } = require(`discord-buttons`);

module.exports = {
    name: `components`,
    execute(msg, args){
        let btn = new MessageButton()
        .setLabel(`Display Server Details`)
        .setStyle(`green`)
        .setID(`create-embed`)

        let btn2 = new MessageButton()
        .setEmoji(`835682130285166632`)
        .setID(`zero-two`)
        .setStyle(`blurple`)

        msg.channel.send(`Components`, {buttons: [btn, btn2]});
    }
}