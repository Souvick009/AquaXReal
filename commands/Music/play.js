const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
module.exports = {
    name: "play",
    accessableby: "Everyone",
    description: "Plays the song",
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
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return send('Missing connect premission');
        if (!permissions.has(PermissionFlagsBits.Connect)) return send(message, { content: 'Missing speak permission' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${author.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };
        // message.guild.members.me.voice.channel.setRTCRegion("singapore")
        // const region = message.guild.members.me.voice.channel.rtcRegion
        // const i = 0;
        // setTimeout(() => {
        //     while (i != 1) {
        //         const check = region.split('e');
        //         if (check[1] < 1000) {
        //             message.guild.members.me.voice.channel.setRTCRegion("singapore")
        //         } else {
        //             i = 1;
        //         }
        //     }
        // }, 1000);

        const search = new Discord.EmbedBuilder()
        search.setDescription(":mag: **Searching! **" + options[0])
        search.setColor("#FFFF00");
        send(message, { embeds: [search] })
        // console.log(message);
        const music = options[0];
        bot.distube.play(message.member.voice.channel, music, {
            textChannel: message.channel,
            member: message.member,
            // message
        })
        // }
    }

}




