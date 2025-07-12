const Discord = require("discord.js");
const Utils = require("utils-discord");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "queue",
    aliases: ['q'],
    accessableby: "Everyone",
    description: "Displays the list of upcoming songs in the queue.",
    usage: "/queue",
    example: "/queue",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        var i
        if (message.type == 2) {
            try {
                i = await message.deferReply()
            } catch (err) {
                console.log(message)
            }
        }

        async function sendM(message, toSend) {
            if (message.type == 2) {
                return await message.editReply(toSend)
            } else {
                let m = await message.channel.messages.fetch(message.id);
                try {
                    return await message.reply(toSend);
                } catch (err) {
                    return message.channel.send(toSend);
                }
            }
        }
        
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
            return sendM(message,{ content: "Nothing is playing right now!" })
        };

    }

}