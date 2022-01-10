const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "pause",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>pause",
    example: ">>pause",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
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

        const alreadyPaused = new Discord.MessageEmbed()
        if (bot.distube.paused) {
            alreadyPaused.setColor("#FF0000");
            alreadyPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            alreadyPaused.setTitle(`❌ ERROR | Cannot pause the Song`);
            alreadyPaused.setDescription(`It's already paused!`);
            return message.channel.send({ embeds: [alreadyPaused] })
        };

        bot.distube.pause(message);

        let queue = bot.distube.getQueue(message);
        let track = queue.songs[0];
        const paused = new Discord.MessageEmbed()
        paused.setColor("#FFFF00");
        paused.setDescription(`⏸ Paused the Song: [${track.name}](${track.url})`)
        return message.channel.send({ embeds: [paused] })
    }
}