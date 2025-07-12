const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require('discord.js');
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

        async function sendM(message, toSend) {
            if (message.type == 2) {
                return await message.editReply(toSend)
            } else {
                let m = await message.channel.messages.fetch(message.id);
                try {
                    return await message.reply(toSend);
                } catch (err) {
                    return message.channel.send(toSend);
                }
            }
        }

        const memberVoiceChannel = message.member.voice.channel;

        if (!memberVoiceChannel) return sendM(message, { content: 'You need to be in a channel to execute this command!' });

        const permissions = memberVoiceChannel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return sendM(message, { content: 'Missing connect premission' });
        if (!permissions.has(PermissionFlagsBits.Speak)) return sendM(message, { content: 'Missing speak permission' });

        if (message.guild.members.me.voice.channel) {

            let areThereMoreThanOneMember = (message.guild.members.me.voice.channel.members.size - 1) > 2
            
            if (memberVoiceChannel.id !== message.guild.members.me.voice.channelId) {
                if (areThereMoreThanOneMember) {
                    sendM(message, { content: `I'm already connected with another voice channel` })
                } else {
                    bot.distube.voices.join(message.member.voice.channel)
                    const embed = new Discord.EmbedBuilder()
                    embed.setDescription("Did someone said music?");
                    embed.setColor(message.guild.members.me.displayHexColor);
                    sendM(message, { embeds: [embed] })
                }
            } else {
                sendM(message, { content: `I'm already connected with your voice channel` })
            }
            // }
        } else {
            bot.distube.voices.join(message.member.voice.channel)
            const embed = new Discord.EmbedBuilder()
            embed.setDescription("Did someone said music?");
            embed.setColor(message.guild.members.me.displayHexColor);
            return sendM(message, { embeds: [embed] })
        }
    }
}