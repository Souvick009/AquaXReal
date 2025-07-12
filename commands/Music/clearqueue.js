const Discord = require("discord.js");
const skip = require("./skip")
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");
//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "clearqueue",
    aliases: [],
    accessableby: "",
    description: "Clears the song queue, removing all pending tracks.",
    usage: ">>remove",
    example: ">>remove",
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
        
        if (!message.member.voice.channel) return sendM(message,{ content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            // samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`❌ ERROR | Please join my voice channel first\nChannel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
                if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                    removeSong();
                } else {
                    const samevc = new Discord.EmbedBuilder()
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                    return sendM(message,{ embeds: [samevc] })
                }
            } else {
                removeSong();
            }

            async function removeSong() {
                let arr = queue.songs;
                if (arr.length >= 1) {
                    arr.splice(1, arr.length)
                }
                if (arr.length <= 1) {
                    bot.distube.skip(message)
                }
                const embed = new Discord.EmbedBuilder()
                    .setDescription(`Cleared the queue`)
                    .setColor(message.guild.members.me.displayHexColor)
                return sendM(message,{ embeds: [embed] })

            }
        } else if (!queue) {
            return sendM(message,{ content: "Nothing is playing right now!" })
        };
    }

}