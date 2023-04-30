const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

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
            if (options[0]) {
                if (options[0] == `OFF`) {
                    bot.distube.setRepeatMode(message, 0)
                    const Loop = new Discord.EmbedBuilder();
                    Loop.setDescription("**Loop mode set to:** OFF");
                    Loop.setColor("#FFFF00");
                    send(message, { embeds: [Loop] })
                } else if (options[0] == `This Song`) {
                    bot.distube.setRepeatMode(message, 1)
                    const Loop = new Discord.EmbedBuilder();
                    Loop.setDescription("**Loop mode set to:** This song");
                    Loop.setColor("#FFFF00");
                    send(message, { embeds: [Loop] })
                } else if (options[0] == `Queue`) {
                    bot.distube.setRepeatMode(message, 2)
                    const Loop = new Discord.EmbedBuilder();
                    Loop.setDescription("**Loop mode set to:** Queue");
                    Loop.setColor("#FFFF00");
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
                Loop.setColor("#FFFF00");
                send(message, { embeds: [Loop] })
            }

        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}