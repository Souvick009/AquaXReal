const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "volume",
    aliases: ["vol", "v"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>volume",
    example: ">>volume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        const embed = new Discord.MessageEmbed();
        embed.setTitle("VOLUME!");
        embed.setColor("#FFFF00");
        embed.setDescription(`Changed volume to \`${args[0]} %\``);
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
        embed.setTimestamp();

        return bot.distube.setVolume(message, args[0]);
    }
}



const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}