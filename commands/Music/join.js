const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "join",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>join",
    example: ">>join",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        if (message.guild.me.voice.channel) {
            if (message.guild.me.voice.channel.id) {
                if (voiceChannel.id !== message.guild.me.voice.channel.id) {
                    if (message.guild.me.voice.channel.members >= 1) {
                        message.channel.send(`I'm already connected with another voice channel`)
                    } else {
                        bot.distube.voices.join(message.member.voice.channel)
                        const embed = new Discord.MessageEmbed()
                        embed.setAuthor({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() });
                        embed.setDescription("I have been summoned!");
                        embed.setColor("#00ff00");
                        embed.setFooter({ text: "Summoned by " + message.author.tag, iconURL: message.author.displayAvatarURL() });
                        embed.setTimestamp()
                        message.channel.send({ embeds: [embed] })
                    }
                } else {
                    message.channel.send(`I'm already connected with your voice channel`)
                }
            }
        } else {
            bot.distube.voices.join(message.member.voice.channel)
            const embed = new Discord.MessageEmbed()
            embed.setAuthor(bot.user.username, bot.user.displayAvatarURL());
            embed.setDescription("I have been summoned!");
            embed.setColor("#00ff00");
            embed.setFooter({ text: "Summoned by " + message.author.tag, iconURL: message.author.displayAvatarURL() });
            embed.setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
    }
}