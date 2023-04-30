const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "autoplay",
    accessableby: "Everyone",
    description: "For toggling the autoplay mode",
    usage: "/autoplay",
    example: "/autoplay",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (!message.member.voice.channel) return send(message, {
            content: 'You must be in a voice channel to use this command.'
        });

        const novc = new Discord.EmbedBuilder()
        if (!message.guild.members.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return send(message, { embeds: [novc] })
        }

        let channel = author.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.EmbedBuilder()
        if (!queue || !queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setTitle(`❌ ERROR | Cannot turn on autoplay mode`);
            notPaused.setDescription(`Play something first!`);
            return send(message, { embeds: [notPaused] })
        };

        async function autoplay() {
            let mode = queue.toggleAutoplay(message);
            const autoplay = new Discord.EmbedBuilder();
            autoplay.setDescription("Autoplay Mode Set To: `" + (mode ? "On" : "Off") + "`");
            autoplay.setColor("#FFFF00");
            send(message, { embeds: [autoplay] });
        }

        autoplay()
    }

}