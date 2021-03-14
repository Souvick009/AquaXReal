const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: "seek",
    aliases: ['seek'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>seek",
    example: ">>seek ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');

        const seek = new Discord.MessageEmbed()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${args[0]} seconds\``)
        seek.setColor("#00ff00");
        message.channel.send(seek)
        return bot.distube.seek(message, Number(args[0] * 1000));
    }


}

