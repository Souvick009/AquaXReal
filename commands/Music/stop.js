const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "stop",
    aliases: ["disconnect","dc"],
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
    
        if(queue) {
            bot.distube.stop(message)
    
            message.channel.send('Successfully Disconnected!')
        } else if (!queue) {
            return
        };
    }
}



const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}