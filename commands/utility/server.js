module.exports = {
    name: "server",
    description: "Provides server information",
    execute(message, args){
        message.channel.send(`Server name: ${message.guild.name}\nServer region: ${message.guild.region}`);
    }
}