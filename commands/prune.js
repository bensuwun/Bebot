module.exports = {
    name: `prune`,
    description: `Deletes the x most recent messages in the channel`,
    execute(msg, args){
        const amount = args[0];
        if(isNaN(amount)){
            return msg.reply(`That doesn't seem to be a valid number`);
        }

        msg.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            msg.channel.send(`There was an error trying to prune messages in this channel`);
        })
    }
}