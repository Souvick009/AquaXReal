const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const skip = require("./skip")

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "remove",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>remove",
    example: ">>remove",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            if (isNaN(parseInt(args[0])) || !args[0]) return message.reply('Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.') // If Number Is Not A Number or Not A Valid Number.
            let remove = args[0] - 1
            let arr = queue.songs;
            if (remove > arr.length || remove < 0) { return message.reply('Thats Not A Valid Number.') } // If Number Is Not Their In Queue Or -ve.

            const embed = new Discord.MessageEmbed()
                .setTitle('Song Removed')
                .setColor('#FFFF00')
                .addField(`Removed:- **[${arr[remove].name}](${arr[remove].url})**`)
                .addField('Song Removed by:-', message.author)
                .setTimestamp()
                .setFooter('Song Removed')
            message.channel.send(embed)
            if (remove === 0) {
                skip.execute(message, agrs)
            }
            else {
                arr.splice(remove, 1)
            }
            message.bot.queue.set(message.guild.id, queue)
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }

}