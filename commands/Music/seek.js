const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

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
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
    run: async (bot, message, args) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return send(message, { content: 'You need to be in a channel to execute this command!' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.MessageEmbed()
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
        // console.log(`total ` + total)
        let time;
        let input2 = options[0]
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
        // console.log(time)

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
            alreadyPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            alreadyPaused.setDescription(`First resume the song then try to seek!`);
            return send(message, { embeds: [alreadyPaused] })
        };

        bot.distube.seek(message, Number(time * 1000));
        const seek = new Discord.MessageEmbed()
        seek.setTitle(":fast_forward: Seeked!");
        seek.setDescription(`Seeked the song for \`${time}\``)
        seek.setColor("#00ff00");
        return send(message, { embeds: [seek] })

    }


}

