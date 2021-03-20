const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "stop",
    aliases: ["disconnect", "dc"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>stop",
    example: ">>stop",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        let queue = await bot.distube.getQueue(message);

        let channel = message.member.voice.channel.id;

        if (queue) {
            bot.distube.stop(message)

            const embed = new Discord.MessageEmbed();
            embed.setTitle("⏹ STOPPED!");
            embed.setColor("#FF0000");
            embed.setDescription('Successfully Disconnected!');
            embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
            embed.setTimestamp();

            message.channel.send(embed)
        } else if (channel === message.guild.me.voice.channel.id) {
            message.guild.me.voice.channel.leave();
            const embed1 = new Discord.MessageEmbed();
            embed1.setTitle("⏹ STOPPED!");
            embed1.setColor("#FF0000");
            embed1.setDescription('Successfully Disconnected!');
            embed1.setFooter(bot.user.username, bot.user.displayAvatarURL());
            embed1.setTimestamp();
            return message.channel.send(embed1)
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };

    }
}