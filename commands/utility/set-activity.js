module.exports = {
    name: `set-activity`,
    description: `Sets the status of bot`,
    execute(msg, args){
        if(!msg.mentions.users.size){
            msg.client.user.setActivity(args.join(` `), { type: `PLAYING`});
        }
    }
}