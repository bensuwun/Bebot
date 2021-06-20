module.exports = {
    name: `delete`,
    description: `Lesson for asynchronous programming, deletes bot message after 2 seconds`,
    execute(msg, args){
        msg.channel.send(`This message will be deleted after 2 seconds`)
            .then( sentMessage => sentMessage.delete({ timeout: 2000 }))
            .catch(error => {
                msg.channel.send(`There was an error with \`${this.name}\` command`);
            });
    }
}