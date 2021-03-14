const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "loop",
    aliases: ["disconnect", "dc"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>loop",
    example: ">>loop",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
                bot.distube.setRepeatMode(message, parseInt(args[0]))
                const Loop = new Discord.MessageEmbed();
                Loop.setTitle("Repeat mode set to:!");
                Loop.setDescription(`${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`);
                Loop.setColor("#FFFF00");
                Loop.setFooter(bot.user.username, bot.user.displayAvatarURL());
                Loop.setTimestamp();
                message.channel.send(Loop)
            }
            else {
                const error1 = new Discord.MessageEmbed();
                error1.setTitle("ERROR");
                error1.setDescription(`Please use a number between **0** and **2**   |   *(0: Disabled, 1: Repeat a song, 2: Repeat all the queue)*`);
                error1.setColor("#FF0000");
                error1.setFooter(bot.user.username, bot.user.displayAvatarURL());
                error1.setTimestamp();
                message.channel.send(error1)
            }
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }
}



const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}