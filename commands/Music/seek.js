const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const ms = require("ms");

module.exports = {
    name: "seek",
    aliases: ['seek'],
    accessableby: "Everyone",
    description: "Seeks the time of the song",
    usage: "/seek",
    example: "/seek ",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "time",
        description: "the timestamp on which you want to seek the song",
        required: true,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
        req: "user"
    }],
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return send(message, { content: 'You need to be in a channel to execute this command!' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.EmbedBuilder()
        if (queue.isPlaying) {
            notPaused.setColor("#FF0000");
            notPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            notPaused.setDescription(`Play something first!`);
            return send(message, { embeds: [notPaused] })
        };

        let track = queue.songs[0];

        var total2 = track.formattedDuration;
        var total;
        if (total2.includes(`:`)) {
            let total1 = total2.split(`:`)
            if (total1.length == 2) { // 1:30  // Minutes to Secs
                let min = total1[0] * 60 // 60 sec
                let sec = total1[1] // 30
                total = parseInt(min) + parseInt(sec)
            } else if (total1.length == 3) { // 1:20:30  //Hours to Secs
                let hou = total1[0] * 60 * 60 // 3600 sec
                let min = total1[1] * 60 // 60 sec
                let sec = total1[2] // 30
                total = parseInt(hou) + parseInt(min) + parseInt(sec)
            } else {
                total = parseInt(total1)
            }
        }
        // console.log(`total ` + total)
        let time;
        let input2 = options[0]
        if (input2.includes(`:`)) {
            let input = input2.split(`:`)
            if (input.length >= 2) { // 1:30  // Minutes to Secs
                let min = input[0] * 60 // 60 sec
                let sec = input[1] // 30
                time = parseInt(min) + parseInt(sec)
            } else if (input.length >= 3) { // 1:20:30  //Hours to Secs
                let hou = input[0] * 60 * 60 // 3600 sec
                let min = input[1] * 60 // 60 sec
                let sec = input[2] // 30
                time = parseInt(hou) + parseInt(min) + parseInt(sec)
            } else {
                time = parseInt(input)
            }
        } else if (input2.includes('m')) {
            let input = input2.split(`m`)
            let min = input[0] * 60 // 60 sec
            time = parseInt(min)
        } else if (input2.includes('h')) {
            let input = input2.split(`m`)
            let hour = input[0] * 60 * 60 // 60 sec
            time = parseInt(hour)
        } else {
            time = parseInt(input2)
        }

        const embed1 = new Discord.EmbedBuilder()
        // console.log(`Time : ` + time + `\nTotal : ` + total)
        if (time < 0 || time > total) {
            embed1.setColor("#FF0000")
            embed1.setDescription(`❌ ERROR | Seeking out of Range`)
            return send(message, { embeds: [embed1] })
        }

        const alreadyPaused = new Discord.EmbedBuilder()
        if (queue.paused) {
            alreadyPaused.setColor("#FF0000");
            alreadyPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            alreadyPaused.setDescription(`First resume the song then try to seek!`);
            return send(message, { embeds: [alreadyPaused] })
        };

        bot.distube.seek(message, Number(time));
        const seek = new Discord.EmbedBuilder()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${ms((time * 1000), { long: true })}\``)
        seek.setColor("#00ff00");
        return send(message, { embeds: [seek] })

    }


}

