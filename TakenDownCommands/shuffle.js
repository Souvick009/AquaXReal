const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "shuffle",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>shuffle",
    example: ">>shuffle",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        //let curqueue


        if (queue) {

            bot.distube.shuffle();

            const resumed = new Discord.EmbedBuilder()
            resumed.setColor("#FFFF00");
            resumed.setDescription("🔀 Shuffled the Queue");
            return message.channel.send({ embeds: [resumed] })

        } else if (!queue) {
            return message.channel.send({ content: "Nothing is playing right now!" })
        };
    }
}