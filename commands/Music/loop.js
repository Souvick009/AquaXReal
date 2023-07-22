const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "loop",
    accessableby: "Everyone",
    description: "For Switching the loop mode",
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
                value: "OFF"
            },
            {
                name: "This Song",
                value: "This Song"
            },
            {
                name: "Queue",
                value: "Queue"
            },
        ]
    }],
    run: async (bot, message, args, options, author) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return send(message, { content: 'You need to be in a channel to execute this command!' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
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
                    return send(message, { embeds: [samevc] })
                }
            } else {
                loop();
            }

            async function loop() {
                if (options[0]) {
                    if (options[0] == `OFF`) {
                        bot.distube.setRepeatMode(message, 0)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** OFF");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        send(message, { embeds: [Loop] })
                    } else if (options[0] == `This Song`) {
                        bot.distube.setRepeatMode(message, 1)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** This song");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        send(message, { embeds: [Loop] })
                    } else if (options[0] == `Queue`) {
                        bot.distube.setRepeatMode(message, 2)
                        const Loop = new Discord.EmbedBuilder();
                        Loop.setDescription("**Loop mode set to:** Queue");
                        Loop.setColor(message.guild.members.me.displayHexColor);
                        send(message, { embeds: [Loop] })
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
                    send(message, { embeds: [Loop] })
                }
            }
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}