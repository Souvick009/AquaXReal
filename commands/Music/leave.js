const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: "leave",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>leave",
    example: ">>leave",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        await voiceChannel.leave();
        await message.channel.send('Leaving channel :smiling_face_with_tear:')
    }


}