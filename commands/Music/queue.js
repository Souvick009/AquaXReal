module.exports = {
    name: "queue",
    aliases: ["q"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>queue",
    example: ">>queue",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ***${song.name}*** - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
        ).slice(0, 10).join("\n"));
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
        
    }

}