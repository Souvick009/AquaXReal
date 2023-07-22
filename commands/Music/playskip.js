const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "playskip",
    accessableby: "Everyone",
    description: "Skips the current song and plays the new song",
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
        if (!permissions.has('CONNECT')) return message.channel.send('Missing connect premission');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                playskip();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return send(message, { embeds: [samevc] })
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
                return send(message, { embeds: [Searchterm] })
            };

            const search = new Discord.EmbedBuilder()
            search.setDescription(":mag: **Searching! **" + options[0])
            search.setColor("#FFFF00");
            send(message, { embeds: [search] })

            const music = options[0]
            bot.distube.play(message.member.voice.channel, music, {
                member: message.member,
                textChannel: message.channel,
                skip: true
            })
        }
    }

}




