const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "save",
    accessableby: "Everyone",
    description: "Saves the current queue for future use.",
    usage: "/save",
    example: "/save",
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
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message,{ embeds: [vc] })
        };

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };


        let queue = bot.distube.getQueue(message);
        if (queue) {
            var mentionedUser = author


            const dmEmbed = new Discord.EmbedBuilder()
                .setColor(0x00FFFF)
                .setThumbnail(queue.songs[0].thumbnail)
                .setDescription(`[${queue.songs[0].name}](${queue.songs[0].url})`)
                .setTimestamp()
            var blocked = false;
            await mentionedUser.send({
                embeds: [dmEmbed],
            }).catch(error => {
                if (error.code === 50007) {
                    blocked = true;
                } else {
                    console.log(error)
                }
            }).finally(async () => {
                if (blocked) {
                    const errEmbed = new Discord.EmbedBuilder();
                    errEmbed.setColor(0xFF0000)
                    errEmbed.setDescription(`❌ Your dm is closed! `);
                    return sendM(message,{
                        embeds: [errEmbed]
                    }, false);
                } else {
                    const save = new Discord.EmbedBuilder()
                    save.setColor(message.guild.members.me.displayHexColor);
                    save.setDescription(`✅ Sent the name of the current track in your dms`)
                    return sendM(message,{ embeds: [save] })
                }
            })
        } else if (!queue) {
            return sendM(message,{ content: "Nothing is playing right now!" })
        };
    }
}