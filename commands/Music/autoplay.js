const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>autoplay",
    example: ">>autoplay",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (!author.voice.channel) return send(message, {
            content: 'You must be in a voice channel to use this command.'
        });

        const novc = new Discord.MessageEmbed()
        if (!message.guild.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${author.voice.channel.name}\``)
            return send(message, { embeds: [novc] })
        }

        let channel = author.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.MessageEmbed()
        if (!queue || !queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() });
            notPaused.setTitle(`❌ ERROR | Cannot turn on autoplay mode`);
            notPaused.setDescription(`Play something first!`);
            return send(message, { embeds: [notPaused] })
        };

        async function autoplay() {
            let mode = queue.toggleAutoplay(message);
            const autoplay = new Discord.MessageEmbed();
            autoplay.setDescription("Autoplay Mode Set To: `" + (mode ? "On" : "Off") + "`");
            autoplay.setColor("#FFFF00");
            send(message, { embeds: [autoplay] });
        }

        autoplay()
    }

}