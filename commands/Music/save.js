const Discord = require("discord.js");

module.exports = {
    name: "save",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>nowplaying",
    example: ">>np , >> nowplaying",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
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
                    errEmbed.setDescription(`❌ I was unable to dm that User! `);
                    return send(message, {
                        embeds: [errEmbed]
                    }, false);
                } else {
                    const save = new Discord.MessageEmbed()
                    save.setColor("#00ff00");
                    save.setDescription(`✅ Sent the name of the current track in your dms`)
                    return message.channel.send({ embeds: [save] })
                }
            })
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };
    }
}