const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const prefix = ">>";

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "volume",
    aliases: ["vol", "v"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>volume",
    example: ">>volume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send(vc)
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };


        const embed = new Discord.MessageEmbed()
        if (!args[0]) {
            embed.setColor("#FF0000")
            embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
            embed.setTitle(`❌ ERROR | You didn't provided a vaild volume number`)
            embed.setDescription(`Current Volume: \`${bot.distube.getQueue(message).volume}%\`\nUsage: \`${prefix}volume <0-200>\``)
            return message.channel.send(embed)
        };

        const embed1 = new Discord.MessageEmbed()
        if (!(0 <= Number(args[0]) && Number(args[0]) <= 200)) {
            embed1.setColor("#FF0000")
            embed1.setFooter(bot.user.username, bot.user.displayAvatarURL())
            embed1.setTitle(`❌ ERROR | Volume out of Range`)
            embed1.setDescription(`Usage: \`${prefix}volume <0-150>\``)
            return message.channel.send(embed1)
        };

        bot.distube.setVolume(message, Number(args[0]));

        const embed3 = new Discord.MessageEmbed()
        embed3.setTitle("VOLUME!");
        embed3.setColor("#FFFF00")
        embed3.setTimestamp();
        embed3.setDescription(`🔊 Changed the Volume to: \`${args[0]}%\``)
        embed3.setFooter(bot.user.username, bot.user.displayAvatarURL())
        return message.channel.send(embed3)
        

        //const embed = new Discord.MessageEmbed();
        //embed.setTitle("VOLUME!");
        //embed.setColor("#FFFF00");
        //embed.setDescription(`Changed volume to \`${args[0]} %\``);
        //embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
        //embed.setTimestamp();

        //message.channel.send(embed)

        //return bot.distube.setVolume(message, args[0]);
    }
}