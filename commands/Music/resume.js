const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "resume",
    accessableby: "Everyone",
    description: "Resumes the current song",
    usage: "/resume",
    example: "/resume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);

        const notPaused = new Discord.MessageEmbed()
        if (queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setTitle(`❌ ERROR | Cannot resume the Song`);
            notPaused.setDescription(`It's not paused!`);
            return send(message, { embeds: [notPaused] })
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
        return send(message, { embeds: [resumed] })
    }
}