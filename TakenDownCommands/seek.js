const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
// const Song = require("distube/typings/Song");
const ms = require("ms")
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

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

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

        var total2 = track.formattedDuration;
        var total;
        if (total2.includes(`:`)) {
            let total1 = total2.split(`:`)
            console.log(total1)
            if (total1.length == 2) { // 1:30  // Minutes to Secs
                let min = total1[0] * 60 // 60 sec
                let sec = total1[1] // 30
                total = min + sec
                console.log(total)
            } else if (total1.length == 3) { // 1:20:30  //Hours to Secs
                let hou = total1[0] * 60 * 60 // 3600 sec
                let min = total1[1] * 60 // 60 sec
                let sec = total1[2] // 30
                total = hou + min + sec
            } else {
                total = total1
            }
        }
        console.log(`total ` + total)
        let time;
        let input2 = args[0]
        if (input2.includes(`:`)) {
            let input = input2.split(`:`)
            console.log(input)
            if (input.length >= 2) { // 1:30  // Minutes to Secs
                let min = input[0] * 60 // 60 sec
                let sec = input[1] // 30
                time = min + sec
                console.log(time)
            } else if (input.length >= 3) { // 1:20:30  //Hours to Secs
                let hou = input[0] * 60 * 60 // 3600 sec
                let min = input[1] * 60 // 60 sec
                let sec = input[2] // 30
                time = hou + min + sec
            } else {
                time = input
            }
        }
        console.log(time)
        // const embed1 = new Discord.MessageEmbed()
        // if (time < 0 || time > total) {
        //     embed1.setColor("#FF0000")
        //     embed1.setFooter(bot.user.username, bot.user.displayAvatarURL())
        //     embed1.setTitle(`❌ ERROR | Seeking out of Range`)
        //     return message.channel.send(embed1)
        // }

        const alreadyPaused = new Discord.MessageEmbed()
        if (bot.distube.isPaused(message)) {
            alreadyPaused.setColor("#FF0000");
            alreadyPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            alreadyPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            alreadyPaused.setDescription(`First resume the song then try to seek!`);
            return message.channel.send(alreadyPaused)
        };

        bot.distube.seek(message, Number(time * 1000));
        const seek = new Discord.MessageEmbed()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${time}\``)
        seek.setColor("#00ff00");
        return message.channel.send(seek)

    }


}

