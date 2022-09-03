const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "resume",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>resume",
    example: ">>resume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);

        const notPaused = new Discord.MessageEmbed()
        if (queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPaused.setTitle(`❌ ERROR | Cannot resume the Song`);
            notPaused.setDescription(`It's not paused!`);
            return message.channel.send({ embeds: [notPaused] })
        };
        //Function to wait some time
        const delay = function (delayInms) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(2);
                }, delayInms);
            });
        }

        // bot.distube.resume(message);
        // await delay(100);
        // bot.distube.pause(message);
        // await delay(100);
        queue.resume(message);

        let track = queue.songs[0];

        const resumed = new Discord.MessageEmbed()
        resumed.setColor("#FFFF00");
        resumed.setDescription(`▶ Resumed the Song: [${track.name}](${track.url})`)
        return message.channel.send({ embeds: [resumed] })
    }
}