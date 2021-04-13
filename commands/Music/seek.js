const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
// const Song = require("distube/typings/Song");

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

        let queue = bot.distube.getQueue(message);

        let track = queue.songs[0];

        var total = track.duration;

        var formatDuration = milliseconds => {
            if (!milliseconds || !parseInt(milliseconds)) return "00:00";
            const seconds = Math.floor(milliseconds % 60000 / 1000);
            const minutes = Math.floor(milliseconds % 3600000 / 60000);
            const hours = Math.floor(milliseconds / 3600000);
            if (hours > 0) {
                return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
            }
            if (minutes > 0) {
                return `${formatInt(minutes)}:${formatInt(seconds)}`;
            }
            return `00:${formatInt(seconds)}`;
        };

        // const embed1 = new Discord.MessageEmbed()
        // if (!(0 <= Number(args[0]) && Number(args[0]) <= total)) {
        //     embed1.setColor("#FF0000")
        //     embed1.setFooter(bot.user.username, bot.user.displayAvatarURL())
        //     embed1.setTitle(`❌ ERROR | Seeking out of Range`)
        //     return message.channel.send(embed1)
        // }


        const seek = new Discord.MessageEmbed()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${args[0]} seconds\``)
        seek.setColor("#00ff00");
        message.channel.send(seek)
        return bot.distube.seek(message, Number(args[0] * formatDuration));
    }


}

