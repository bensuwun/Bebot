module.exports = {
    name: `args-info`,
    description: "Command testing for arguments",
    args: true,
    execute(msg, args){
        console.log(args.length)
        if(!args.length)
            return msg.reply(`You provided no arguments`);
        else{
            msg.reply(`${args}`);
        }
    }
}