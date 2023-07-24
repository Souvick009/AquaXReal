const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "autoplay",
    accessableby: "Everyone",
    description: "Enables automatic playback of the related song in the queue.",
    usage: "/autoplay",
    example: "/autoplay",
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

        if (!message.member.voice.channel) return sendM(message, {
            content: 'You must be in a voice channel to use this command.'
        });

        const novc = new Discord.EmbedBuilder()
        if (!message.guild.members.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return sendM(message, { embeds: [novc] })
        }

        let channel = message.guild.members.cache.get(author.id).voice.channel.id
        //author.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPaused = new Discord.EmbedBuilder()
        if (!queue || !queue.playing) {
            notPaused.setColor("#FF0000");
            notPaused.setTitle(`❌ ERROR | Cannot turn on autoplay mode`);
            notPaused.setDescription(`Play something first!`);
            return sendM(message, { embeds: [notPaused] })
        };

        async function autoplay() {
            let mode = queue.toggleAutoplay(message);
            const autoplay = new Discord.EmbedBuilder();
            autoplay.setDescription("Autoplay Mode Set To: `" + (mode ? "On" : "Off") + "`");
            autoplay.setColor(message.guild.members.me.displayHexColor);
            return sendM(message, { embeds: [autoplay] });
        }

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                autoplay();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return sendM(message, { embeds: [samevc] })
            }
        } else {
            autoplay();
        }
    }

}