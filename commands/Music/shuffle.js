const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "shuffle",
    accessableby: "Everyone",
    description: "Shuffles the queue",
    usage: "/shuffle",
    example: "/shuffle",
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

        let queue = await bot.distube.getQueue(message);

        //let curqueue


        if (queue) {

            bot.distube.shuffle(message);

            const resumed = new Discord.MessageEmbed()
            resumed.setColor("#FFFF00");
            resumed.setDescription("🔀 Shuffled the Queue");
            return message.channel.send({ embeds: [resumed] })

        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}