const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const getMember = require("../../utils/getMember.js");

module.exports = {
    name: "suggest",
    accessableby: "Everyone",
    description: "Suggest the currently playing song to the mentioned user",
    usage: "/suggest",
    example: "/suggest",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "user",
        description: "The user to whom you want to suggest",
        required: true,
        type: 6, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }, {
        name: "message",
        description: "Something ou want to say the user while suggesting the song",
        required: false,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
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
            // var mentionedUser = options[0]
            var mentionedUser = await getMember(bot, args, options, message, false, false, true, 0, false)
            console.log(mentionedUser)
            const dmEmbed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setThumbnail(queue.songs[0].thumbnail)
                .setDescription(`[${queue.songs[0].name}](${queue.songs[0].url}) -  Suggested by ${mentionedUser}(${mentionedUser.user.username}#${mentionedUser.user.discriminator}) \n Message - ${options[1]} `)
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
                    errEmbed.setDescription(`❌ The user's dm is closed! `);
                    return send(message, {
                        embeds: [errEmbed]
                    }, false);
                } else {
                    const save = new Discord.MessageEmbed()
                    save.setColor("#00ff00");
                    save.setDescription(`✅ Suggested the current track to the mentioned user`)
                    return send(message, { embeds: [save] })
                }
            })
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}