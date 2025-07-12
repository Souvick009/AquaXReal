const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "disconnect",
    aliases: ['dc', 'stop', 'leave'],
    accessableby: "Everyone",
    description: "Disconnects the bot from the voice channel",
    usage: "/disconnect",
    example: "/disconnect",
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

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message, { embeds: [vc] })
        };

        const novc = new Discord.EmbedBuilder()
        if (!message.guild.members.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return sendM(message, { embeds: [novc] })
        }

        let memberChannel = message.member.voice.channelId;
        let myChannel = message.guild.members.me.voice.channelId
        let areThereMoreThanOneMember = (message.guild.members.me.voice.channel.members.size - 1) > 2

        const samevc = new Discord.EmbedBuilder()
        if (areThereMoreThanOneMember && memberChannel !== myChannel || bot.distube.getQueue(message) && memberChannel !== myChannel) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };

        if (areThereMoreThanOneMember) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                dc();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return sendM(message, { embeds: [samevc] })
            }
        } else {
            dc();
        }

        async function dc() {
            const queue = bot.distube.getQueue(message)
            await bot.VibeSync.setVoiceStatus(message.guild.members.me.voice.channelId, "")
            bot.distube.voices.leave(message.guild)
            const embed1 = new Discord.EmbedBuilder();
            embed1.setColor(message.guild.members.me.displayHexColor);
            embed1.setDescription('Successfully Disconnected!');
            return sendM(message, { embeds: [embed1] })
        }
    }
}