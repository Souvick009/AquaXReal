const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: "play",
    aliases: ['p'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        const music = args.join(" ");
        const search = new Discord.MessageEmbed()
        search.setTitle(":mag: Searching!");
        search.setDescription(args.join(" "))
        search.setColor("#FFFF00");
        message.channel.send(search)
        
        bot.distube.play(message, music)
    }


}

