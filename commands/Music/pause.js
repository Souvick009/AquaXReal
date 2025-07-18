const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "pause",
    accessableby: "Everyone",
    description: "Pauses the current playback.",
    usage: "/pause",
    example: "/pause",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        var i
        if (message.type == 2) {
            try {
                i = await message.deferReply()
            } catch (err) {
                console.log(message)
            }
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
            return sendM(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        if (!queue) {
            return sendM(message, { content: "Nothing is playing right now!" })
        };
        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                pause();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return sendM(message, { embeds: [samevc] })
            }
        } else {
            pause();
        }

        function pause() {
            const alreadyPaused = new Discord.EmbedBuilder()
            if (queue.paused) {
                alreadyPaused.setColor("#FF0000");
                alreadyPaused.setTitle(`❌ ERROR | Cannot pause the Song`);
                alreadyPaused.setDescription(`It's already paused!`);
                return sendM(message, { embeds: [alreadyPaused] })
            };

            queue.pause(message);

            let track = queue.songs[0];
            const paused = new Discord.EmbedBuilder()
            paused.setColor(message.guild.members.me.displayHexColor);
            paused.setDescription(`⏸ Paused the Song: [${track.name}](${track.url})`)
            return sendM(message, { embeds: [paused] })
        }
    }
}