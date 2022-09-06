const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

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
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing connect premission');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!options[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`/play <URL / TITLE>\``)
            return send(message, { embeds: [Searchterm] })
        };
        const search = new Discord.MessageEmbed()
        search.setDescription(":mag: **Searching! **" + options[0])
        search.setColor("#FFFF00");
        send(message, { embeds: [search] })

        // //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
        // if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")) {
        //     getPreview(args.join(" ")).then(result => {
        //         bot.distube.play(message, result.title);
        //     })
        // }
        // else if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")) {
        //     getTracks(args.join(" ")).then(result => {
        //         for (const song of result)
        //             bot.distube.play(message, song.name);
        //     })
        // }
        // else {
        const music = options[0]
        bot.distube.play(message.member.voice.channel, music, {
            member: message.member,
            textChannel: message.channel,
            message: message,
            skip: true
        })
        // }
    }

}




