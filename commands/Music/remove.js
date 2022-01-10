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

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if (message.guild.id == "679765534950424601") {
                if (message.guild.me.voice.channel.members >= 2) {
                    if (message.author.roles.cache.some(r => r.id === "685843002123616256")) {
                        removeSong()
                    } else {
                        return message.reply(`You don't have the D.J role to remove a song.`)
                    }
                } else {
                    removeSong()
                }
            } else {
                removeSong()
            }

            async function removeSong() {
                if (isNaN(parseInt(args[0])) || !args[0]) return message.reply('Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.') // If Number Is Not A Number or Not A Valid Number.
                let remove = args[0] - 1
                let arr = queue.songs;
                if (remove > arr.length || remove < 0) { return message.reply('Thats Not A Valid Number.') } // If Number Is Not Their In Queue
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Song Removed:`)
                    .setDescription(`[${arr[remove].name}](${arr[remove].url})`)
                    .setColor('#FFFF00')
                    .addField('Song Removed by:-', message.author.username)
                    .setTimestamp()
                    .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                message.channel.send({ embeds: [embed] })
                if (remove === 0) {
                    skip.execute(message, agrs)
                }
                else {
                    arr.splice(remove, 1)
                }
            }
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }

}