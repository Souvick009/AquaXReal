const Discord = require("discord.js");
const prefix = require("./../../index.js")
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { getTracks, getPreview } = require("spotify-url-info");

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
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send(vc)
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing connect premission');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!args[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setFooter(bot.user.username, bot.user.displayAvatarURL())
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
            return message.channel.send(Searchterm)
        };
        const search = new Discord.MessageEmbed()
        search.setTitle(":mag: Searching!");
        search.setDescription(args.join(" "))
        search.setColor("#FFFF00");
        message.channel.send(search)

        //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
        if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")) {
            getPreview(args.join(" ")).then(result => {
                bot.distube.play(message, result.title);
            })
        }
        else if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")) {
            getTracks(args.join(" ")).then(result => {
                for (const song of result)
                    bot.distube.play(message, song.name);
            })
        }
        else {
            const music = args.join(" ");


            bot.distube.play(message, music)
        }
    }

}




