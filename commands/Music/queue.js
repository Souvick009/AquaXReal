const Discord = require("discord.js");
const Utils = require("utils-discord");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "queue",
    accessableby: "Everyone",
    description: "Shows the queue for this server",
    usage: "/queue",
    example: "/queue",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {

        let queue = await bot.distube.getQueue(message);


        if (queue) {

            let toSend = []
            let queues = queue.songs
            queues.forEach((song, i) => {
                // let k = queue.songs;
                // let songs = k.slice(i, i + 10);
                if (i >= 1) {
                    toSend.push(`**${i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                }
            })
            toSend.unshift(`**Now Playing:**\n [${queues[0].name}](${queues[0].url}) - \`${queues[0].formattedDuration}\``)
            let options = {
                title: `Current Queue for: ${message.guild.name} (Total Duration: ${queue.formattedDuration})`,
                color: message.guild.members.me.displayHexColor,
                // args: null,
                buttons: true,
                thumbnail: message.guild.iconURL(),
                perpage: 11
            }

            Utils.createEmbedPages(bot, message, toSend, options)
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };

    }

}