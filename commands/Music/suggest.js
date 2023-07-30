const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const getMember = require("../../utils/getMember.js");

module.exports = {
    name: "suggest",
    accessableby: "Everyone",
    description: "Provides song suggestions based on user input or listening history.",
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
            return sendM(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };


        let queue = bot.distube.getQueue(message);
        if (queue) {
            // var mentionedUser = options[0]
            const samevc = new Discord.EmbedBuilder()
            if (message.type != 2) {
                if (!args[0]) {
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | Didn't mentioned anyone to suggest the song`)
                    return sendM(message, { embeds: [samevc] })
                }
            }
            var mentionedUser = await getMember(bot, args, options, message, false, false, true, 0, false)
            if (!options[1])
                var msg = "Not Provided"
            else
                msg = options[1]

            const dmEmbed = new Discord.EmbedBuilder()
                .setColor(0x00FFFF)
                .setThumbnail(queue.songs[0].thumbnail)
                .setDescription(`[${queue.songs[0].name}](${queue.songs[0].url}) -  Suggested by <@${author.id}> (${author.username}) \n\n Message - ${msg} `)
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
                    errEmbed.setDescription(`❌ The user's dm is closed! `);
                    return sendM(message, {
                        embeds: [errEmbed]
                    }, false);
                } else {
                    const save = new Discord.EmbedBuilder()
                    save.setColor(message.guild.members.me.displayHexColor);
                    save.setDescription(`✅ Suggested the current track to the mentioned user`)
                    return sendM(message, { embeds: [save] })
                }
            })
        } else if (!queue) {
            return sendM(message, { content: "Nothing is playing right now!" })
        };
    }
}