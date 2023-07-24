const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "join",
    aliases: ['j'],
    accessableby: "Everyone",
    description: "Makes the bot join a voice channel.",
    usage: "/join",
    example: "/join",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (message.type == 2) {
            try {
                var i = await message.deferReply()
            } catch (err) {
                console.log(message)
            }
            options = options
        } else {
            options = args
        }

        function sendM(message, toSend) {
            if (message.type == 2) {
                i.edit(toSend)
            } else {
                message.reply(toSend)
            }
        }
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return sendM(message,{ content: 'You need to be in a channel to execute this command!' });

        if (message.guild.members.me.voice.channel) {
            // if (message.guild.members.me.voice.channel.id) {
            if (voiceChannel.id !== message.guild.members.me.voice.channel.id) {
                if (message.guild.members.me.voice.channel.members > 1) {
                    sendM(message,{ content: `I'm already connected with another voice channel` })
                } else {
                    bot.distube.voices.join(message.member.voice.channel)
                    const embed = new Discord.EmbedBuilder()
                    embed.setDescription("Did someone said music?");
                    embed.setColor(message.guild.members.me.displayHexColor);
                    sendM(message,{ embeds: [embed] })
                }
            } else {
                sendM(message,{ content: `I'm already connected with your voice channel` })
            }
            // }
        } else {
            bot.distube.voices.join(message.member.voice.channel)
            const embed = new Discord.EmbedBuilder()
            embed.setDescription("Did someone said music?");
            embed.setColor(message.guild.members.me.displayHexColor);
            return sendM(message,{ embeds: [embed] })
        }
    }
}