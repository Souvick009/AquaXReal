const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "loop",
    accessableby: "Everyone",
    description: "Enables or disables looping of the current song.",
    usage: "/loop",
    example: "/loop",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "mode",
        description: "The loop mode on which you want to set",
        required: false,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user",
        choices: [
            {
                name: "OFF",
                value: "off"
            },
            {
                name: "This Song",
                value: "song"
            },
            {
                name: "Queue",
                value: "queue"
            },
        ]
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
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return sendM(message,{ content: 'You need to be in a channel to execute this command!' });

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
                if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                    loop();
                } else {
                    const samevc = new Discord.EmbedBuilder()
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                    return sendM(message,{ embeds: [samevc] })
                }
            } else {
                loop();
            }

            async function loop() {
                if (options[0]) {
                    if (options[0].toLowerCase() == `off`) {
                        bot.distube.setRepeatMode(message, 0)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** OFF");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        sendM(message,{ embeds: [Loop] })
                    } else if (options[0].toLowerCase() == `song`) {
                        bot.distube.setRepeatMode(message, 1)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** This song");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        sendM(message,{ embeds: [Loop] })
                    } else if (options[0].toLowerCase() == `queue`) {
                        bot.distube.setRepeatMode(message, 2)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** Queue");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        sendM(message,{ embeds: [Loop] })
                    }
                } else {
                    queue.setRepeatMode()
                    const Loop = new Discord.EmbedBuilder();
                    var mode;
                    if (queue.repeatMode == 0) {
                        mode = `OFF`
                    } else if (queue.repeatMode == 1) {
                        mode = `This Song`
                    } else if (queue.repeatMode == 2) {
                        mode = `Queue`
                    }
                    Loop.setDescription(`**Loop mode set to:** ${mode}`);
                    Loop.setColor(message.guild.members.me.displayHexColor);
                    sendM(message,{ embeds: [Loop] })
                }
            }
        } else if (!queue) {
            return sendM(message,{ content: "Nothing is playing right now!" })
        };
    }
}