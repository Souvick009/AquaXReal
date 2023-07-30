const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ['vol'],
    accessableby: "Everyone",
    description: "Adjusts the volume level of the bot.",
    usage: "/volume",
    example: "/volume",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "volume",
        description: "The value of the volume",
        required: true,
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
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
                return await message.edit(toSend)
            } else {
                return await message.reply(toSend)
            }
        }
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message,{ embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                setVolume();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return sendM(message,{ embeds: [samevc] })
            }
        } else {
            setVolume();
        }

        async function setVolume() {

            const embed = new Discord.EmbedBuilder()
            if (!options[0]) {
                embed.setColor("#FF0000")
                embed.setTitle(`❌ ERROR | You didn't provided a vaild volume number`)
                embed.setDescription(`Current Volume: \`${bot.distube.getQueue(message).volume}%\`\nUsage: \`/volume <0-200>\``)
                return sendM(message,{ embeds: [embed] })
            };

            const embed1 = new Discord.EmbedBuilder()
            if (!(0 <= Number(options[0]) && Number(options[0]) <= 200)) {
                embed1.setColor("#FF0000")
                embed1.setTitle(`❌ ERROR | Volume out of Range`)
                embed1.setDescription(`Usage: \`/volume <0-200>\``)
                return sendM(message,{ embeds: [embed1] })
            };

            var queue = bot.distube.getQueue(message)
            const notPaused = new Discord.EmbedBuilder()
            if (!queue || !queue.playing) {
                notPaused.setColor("#FF0000");
                notPaused.setTitle(`❌ ERROR | Cannot change my volume`);
                notPaused.setDescription(`Play something first!`);
                return sendM(message,{ embeds: [notPaused] })
            };
            bot.distube.setVolume(message, Number(options[0]));

            const embed3 = new Discord.EmbedBuilder()
            embed3.setColor(message.guild.members.me.displayHexColor)
            embed3.setDescription(`🔊 Changed the Volume to: \`${options[0]}%\``)
            return sendM(message,{ embeds: [embed3] })
        }

    }
}