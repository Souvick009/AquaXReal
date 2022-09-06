const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "save",
    accessableby: "Everyone",
    description: "Sends the current song name in ur dms",
    usage: "/save",
    example: "/save",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };


        let queue = bot.distube.getQueue(message);
        if (queue) {
            var mentionedUser = message.author


            const dmEmbed = new Discord.MessageEmbed()
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
                    const errEmbed = new Discord.MessageEmbed();
                    errEmbed.setColor(0xFF0000)
                    errEmbed.setDescription(`❌ Your dm is closed! `);
                    return send(message, {
                        embeds: [errEmbed]
                    }, false);
                } else {
                    const save = new Discord.MessageEmbed()
                    save.setColor("#00ff00");
                    save.setDescription(`✅ Sent the name of the current track in your dms`)
                    return send(message, { embeds: [save] })
                }
            })
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}