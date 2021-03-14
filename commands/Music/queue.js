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

        let curqueue = queue.songs.map((song, id) =>
            `**${id + 1}**. ***${song.name}*** - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
        ).slice(0, 10).join("\n");


        if (queue) {
            const currentqueue = new Discord.MessageEmbed();
            currentqueue.setTitle("Current Queue!");
            currentqueue.setDescription(curqueue);
            currentqueue.setColor("#FFFF00");
            currentqueue.setFooter(bot.user.username, bot.user.displayAvatarURL());
            currentqueue.setTimestamp();
            message.channel.send(currentqueue)
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };

    }

}