const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "playskip",
    accessableby: "Everyone",
    description: "Skips the current song and immediately plays the song requested by the user.",
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
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message,{ embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return message.channel.send('Missing connect premission');
        if (!permissions.has(PermissionFlagsBits.Speak)) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                playskip();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return sendM(message,{ embeds: [samevc] })
            }
        } else {
            playskip();
        }

        async function playskip() {
            const Searchterm = new Discord.EmbedBuilder()
            if (!options[0]) {
                Searchterm.setColor("#FF0000")
                Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
                Searchterm.setDescription(`Usage: \`/play <URL / TITLE>\``)
                return sendM(message,{ embeds: [Searchterm] })
            };

            var req;
        if (message.type == 2) {
            req = options[0];
        } else {
            req = args.join(" ")
        }

            const search = new Discord.EmbedBuilder()
            search.setDescription(":mag: **Searching! **" + req)
            search.setColor("#FFFF00");
            sendM(message,{ embeds: [search] })

            const music = req
            bot.distube.play(message.member.voice.channel, music, {
                member: message.member,
                textChannel: message.channel,
                skip: true
            })
        }
    }

}




