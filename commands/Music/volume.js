const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "volume",
    accessableby: "Everyone",
    description: "Controls the volume of the queue",
    usage: "/volume",
    example: "/volume",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "volume",
        description: "The value of the volume",
        required: true,
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
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

        setVolume()

        async function setVolume() {

            const embed = new Discord.MessageEmbed()
            if (!options[0]) {
                embed.setColor("#FF0000")
                embed.setTitle(`❌ ERROR | You didn't provided a vaild volume number`)
                embed.setDescription(`Current Volume: \`${bot.distube.getQueue(message).volume}%\`\nUsage: \`/volume <0-200>\``)
                return send(message, { embeds: [embed] })
            };

            const embed1 = new Discord.MessageEmbed()
            if (!(0 <= Number(options[0]) && Number(options[0]) <= 200)) {
                embed1.setColor("#FF0000")
                embed1.setTitle(`❌ ERROR | Volume out of Range`)
                embed1.setDescription(`Usage: \`/volume <0-200>\``)
                return send(message, { embeds: [embed1] })
            };

            var queue = bot.distube.getQueue(message)
            const notPaused = new Discord.MessageEmbed()
            if (!queue || !queue.playing) {
                notPaused.setColor("#FF0000");
                notPaused.setTitle(`❌ ERROR | Cannot change my volume`);
                notPaused.setDescription(`Play something first!`);
                return send(message, { embeds: [notPaused] })
            };
            bot.distube.setVolume(message, Number(options[0]));

            const embed3 = new Discord.MessageEmbed()
            embed3.setColor("#FFFF00")
            embed3.setDescription(`🔊 Changed the Volume to: \`${options[0]}%\``)
            return send(message, { embeds: [embed3] })
        }

    }
}