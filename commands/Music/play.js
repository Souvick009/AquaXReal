const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "play",
    aliases: ['p'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: "/play",
    example: "/play ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = author.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter({ text: "Requested by " + author.tag, iconURL: author.displayAvatarURL() });
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return send('Missing connect premission');
        if (!permissions.has('SPEAK')) return send(message, { content: 'Missing speak permission' });

        let channel = author.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${author.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!args[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`/play <URL / TITLE>\``)
            return send(message, { embeds: [Searchterm] })
        };
        const search = new Discord.MessageEmbed()
        search.setDescription(":mag: **Searching! **" + args.join(" "))
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
        const music = args.join(" ");
        bot.distube.play(author.voice.channel, music, {
            member: author,
            textChannel: message.channel,
            message: message
        })
        // }
    }

}




