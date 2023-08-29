const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
module.exports = {
    name: "play",
    aliases: ['p'],
    accessableby: "Everyone",
    description: "Starts playing a song or adds it to the queue if a song is already playing.",
    usage: "/play",
    example: "/play ",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "song",
        description: "The song which you want to play",
        required: true,
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
        }

        async function sendM(message, toSend) {
            if (message.type == 2) {
                return await message.edit(toSend)
            } else {
                let m = await message.channel.messages.fetch(message.id);
                try {
                    return await message.reply(toSend);
                } catch (err) {
                    return message.channel.send(toSend);
                }
            }
        }


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return sendM(message, { content: 'Missing connect premission' });
        if (!permissions.has(PermissionFlagsBits.Connect)) return sendM(message, { content: 'Missing speak permission' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${author.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);
        var req;
        if (message.type == 2) {
            req = options[0];
        } else {
            if (args.length == 0)
                return message.reply("Please specify the song name or link!")
            req = args.join(" ")
        }
        if (req.startsWith("https://open.spotify.com/playlist/"))
            sendM(message, { content: "**Note : The more songs you have in your playlist, the more time the bot will take to load...**" })
        const search = new Discord.EmbedBuilder()
        search.setDescription(":mag: **Searching! **" + req)
        search.setColor("#FFFF00");
        sendM(message, { embeds: [search] })
        // console.log(message);
        const music = req;
        if (!queue) {
            bot.distube.customPlugins[0].emitEventsAfterFetching = false
        } else {
            bot.distube.customPlugins[0].emitEventsAfterFetching = true
        }
        bot.distube.play(message.member.voice.channel, music, {
            textChannel: message.channel,
            member: message.member,
            // message
        })
        // }
    }

}