const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const move = require("array-move");

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "move",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>move",
    example: ">>move",
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

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            if (!args.length) {
                const usage0 = new Discord.MessageEmbed();
                usage0.setTitle("ERROR");
                usage0.setDescription(`Usage : >>move <old positon> <new position>`);
                usage0.setColor("#FF0000");
                usage0.setFooter(bot.user.username, bot.user.displayAvatarURL());
                usage0.setTimestamp();
                return message.channel.send(usage0);
            }
            if (isNaN(args[0]) || args[0] <= 1) {
                const usage1 = new Discord.MessageEmbed();
                usage1.setTitle("ERROR");
                usage1.setDescription(`Usage : >>move <old positon> <new position>`);
                usage1.setColor("#FF0000");
                usage1.setFooter(bot.user.username, bot.user.displayAvatarURL());
                usage1.setTimestamp();
                return message.channel.send(usage1);
            }

            let song = queue.songs[args[0] - 1];
            let newpos = queue.songs[args[0] - 1, args[1] == 1 ? 1 : args[1] - 1];

            queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
            message.channel.send(`✅ Moved \`${song.name}\` to position ${newpos}`);
            // queue.textChannel.send(
            //     i18n.__mf("move.result", {
            //         author: message.author,
            //         title: song.title,
            //         index: args[1] == 1 ? 1 : args[1]
            //     })
            // );
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }

}