const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>loop",
    example: ">>loop",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            if (args[0]) {
                if (args[0].toLowerCase() == `off`) {
                    bot.distube.setRepeatMode(message, 0)
                    const Loop = new Discord.MessageEmbed();
                    Loop.setDescription("**Loop mode set to:** OFF");
                    Loop.setColor("#FFFF00");
                    message.channel.send({ embeds: [Loop] })
                } else if (args[0].toLowerCase() == `song`) {
                    bot.distube.setRepeatMode(message, 1)
                    const Loop = new Discord.MessageEmbed();
                    Loop.setDescription("**Loop mode set to:** This song");
                    Loop.setColor("#FFFF00");
                    message.channel.send({ embeds: [Loop] })
                } else if (args[0].toLowerCase() == `queue`) {
                    bot.distube.setRepeatMode(message, 2)
                    const Loop = new Discord.MessageEmbed();
                    Loop.setDescription("**Loop mode set to:** Queue");
                    Loop.setColor("#FFFF00");
                    message.channel.send({ embeds: [Loop] })
                } else {
                    const error1 = new Discord.MessageEmbed();
                    error1.setDescription(`:x: Invalid mode! | * *(Off: Disabled, Song: Loop the current song, Queue: Loop all the queue)**`);
                    error1.setColor("#FF0000");
                    error1.setTimestamp();
                    message.channel.send({ embeds: [error1] })
                }
            } else {
                bot.distube.setRepeatMode()
                const Loop = new Discord.MessageEmbed();
                var mode;
                if (bot.distube.repeatMode == 0) {
                    mode = `OFF`
                } else if (bot.distube.repeatMode == 1) {
                    mode = `This Song`
                } else if (bot.distube.repeatMode = 2) {
                    mode = `Queue`
                }
                Loop.setDescription(`**Loop mode set to:** ${mode}`);
                Loop.setColor("#FFFF00");
                message.channel.send({ embeds: [Loop] })
            }

        } else if (!queue) {
            return message.channel.send({ content: "Nothing is playing right now!" })
        };
    }
}