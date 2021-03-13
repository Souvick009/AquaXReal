const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "stop",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>stop",
    example: ">>stop",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        let song = {};

        //If the first argument is a link. Set the song object to have two keys. Title and URl.
        if (ytdl.validateURL(args[0])) {
            const song_info = await ytdl.getInfo(args[0]);
            song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
        }

        await stop_song(message, server_queue);
        await message.channel.send('Leaving channel :smiling_face_with_tear:')
    }
}



const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}