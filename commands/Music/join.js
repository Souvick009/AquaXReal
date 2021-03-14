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

        // Join the same voice channel of the author of the message
        if (voiceChannel) {
            const connection = await message.member.voice.channel.join();
            const embed = new Discord.MessageEmbed()
            embed.setAuthor(bot.user.username, bot.user.displayAvatarURL());
            embed.setDescription("I have been summoned!");
            embed.setColor("#00ff00");
            embed.setFooter(`Summoned by ${message.author}`)
            message.channel.send(embed)
        }
    }
}



const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}