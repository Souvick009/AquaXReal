const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "join",
    accessableby: "Everyone",
    description: "For summoning the bot in your vc",
    usage: "/join",
    example: "/join",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return send(message, { content: 'You need to be in a channel to execute this command!' });

        if (message.guild.members.me.voice.channel) {
            if (message.guild.members.me.voice.channel.id) {
                if (voiceChannel.id !== message.guild.members.me.voice.channel.id) {
                    if (message.guild.members.me.voice.channel.members >= 1) {
                        send(message, { content: `I'm already connected with another voice channel` })
                    } else {
                        bot.distube.voices.join(message.member.voice.channel)
                        const embed = new Discord.EmbedBuilder()
                        embed.setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() });
                        embed.setDescription("I have been summoned!");
                        embed.setColor(message.guild.members.me.displayHexColor);
                        embed.setFooter({ text: "Summoned by " + author.tag, iconURL: author.displayAvatarURL() });
                        embed.setTimestamp()
                        send(message, { embeds: [embed] })
                    }
                } else {
                    send(message, { content: `I'm already connected with your voice channel` })
                }
            }
        } else {
            bot.distube.voices.join(message.member.voice.channel)
            const embed = new Discord.EmbedBuilder()
            embed.setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() });
            embed.setDescription("I have been summoned!");
            embed.setColor(message.guild.members.me.displayHexColor);
            embed.setFooter({ text: "Summoned by " + author.tag, iconURL: author.displayAvatarURL() });
            embed.setTimestamp()
            send(message, { embeds: [embed] })
        }
    }
}