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

        const notPaused = new Discord.MessageEmbed()
        if (!bot.distube.isPlaying(message)) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            notPaused.setDescription(`Play something first!`);
            return message.channel.send(notPaused)
        };

        let queue = bot.distube.getQueue(message);

        let track = queue.songs[0];

        var total = track.duration;
        
        const embed1 = new Discord.MessageEmbed()
        if (!(0 <= Number(args[0]) && Number(args[0]) <= total)) {
            embed1.setColor("#FF0000")
            embed1.setFooter(bot.user.username, bot.user.displayAvatarURL())
            embed1.setTitle(`❌ ERROR | Seeking out of Range`)
            return message.channel.send(embed1)
        }

        const alreadyPaused = new Discord.MessageEmbed()
        if (bot.distube.isPaused(message)) {
            alreadyPaused.setColor("#FF0000");
            alreadyPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            alreadyPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            alreadyPaused.setDescription(`First resume the song then try to seek!`);
            return message.channel.send(alreadyPaused)
        };

        const seek = new Discord.MessageEmbed()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${args[0]} seconds\``)
        seek.setColor("#00ff00");
        message.channel.send(seek)
        return bot.distube.seek(message, Number(args[0] * 1000));
    }


}

