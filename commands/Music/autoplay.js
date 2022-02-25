const Discord = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>autoplay",
    example: ">>autoplay",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        const novc = new Discord.MessageEmbed()
        if (!message.guild.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return message.channel.send({ embeds: [novc] })
        }

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.MessageEmbed()
        if (!queue || !queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPaused.setTitle(`❌ ERROR | Cannot turn on autoplay mode`);
            notPaused.setDescription(`Play something first!`);
            return message.channel.send({ embeds: [notPaused] })
        };

        if (message.guild.id == "679765534950424601") {
            if (message.guild.me.voice.channel.members >= 2) {
                if (message.author.roles.cache.some(r => r.id === "685843002123616256")) {
                    autoplay()
                } else {
                    return message.reply(`You don't have the D.J role to set autoplay mode.`)
                }
            } else {
                autoplay()
            }
        } else {
            autoplay()
        }

        async function autoplay() {
            let mode = queue.toggleAutoplay(message);
            const autoplay = new Discord.MessageEmbed();
            autoplay.setDescription("Autoplay Mode Set To: `" + (mode ? "On" : "Off") + "`");
            autoplay.setColor("#FFFF00");
            message.channel.send({ embeds: [autoplay] });
        }

    }

}