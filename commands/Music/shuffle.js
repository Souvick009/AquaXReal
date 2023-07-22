const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "shuffle",
    accessableby: "Everyone",
    description: "Shuffles the queue",
    usage: "/shuffle",
    example: "/shuffle",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        //let curqueue


        if (queue) {
            if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
                if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                    shufflee();
                } else {
                    const samevc = new Discord.EmbedBuilder()
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                    return send(message, { embeds: [samevc] })
                }
            } else {
                shufflee();
            }
            async function shufflee() {
                bot.distube.shuffle(message);

                const resumed = new Discord.EmbedBuilder()
                resumed.setColor(message.guild.members.me.displayHexColor);
                resumed.setDescription("🔀 Shuffled the Queue");
                return send(message, { embeds: [resumed] })
            }
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}