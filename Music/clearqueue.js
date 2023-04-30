const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const skip = require("./skip")

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "clearqueue",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>remove",
    example: ">>remove",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if (message.guild.id == "679765534950424601") {
                if (message.guild.members.me.voice.channel.members >= 2) {
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
                let arr = queue.songs;
                if (arr.length >= 1) {
                    arr.splice(1, arr.length)
                }
                if (arr.length <= 1) {
                    bot.distube.skip(message)
                }
                const embed = new Discord.EmbedBuilder()
                    .setDescription(`Cleared the queue`)
                    .setColor('#FFFF00')
                message.channel.send({ embeds: [embed] })

            }
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }

}