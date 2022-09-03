const Discord = require("discord.js");
const prefix = '>>';
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { getTracks, getPreview } = require("spotify-url-info");

module.exports = {
    name: "searchplay",
    aliases: ['sp'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter({ text: "Requested by " + message.author.tag, iconURL: message.author.displayAvatarURL() });
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing connect premission');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!args[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
            return message.channel.send({ embeds: [Searchterm] })
        };
        const search = new Discord.MessageEmbed()
        search.setDescription(":mag: **Searching! **" + args.join(" "))
        search.setColor("#FFFF00");
        message.channel.send({ embeds: [search] })

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
        let results = await bot.distube.search(music, {
            type: "video",
            limit: 10
        })
        if (!results) {
            return message.reply(`No result found for ${music}!`)
        }
        let searchResult = "";
        for (i = 0; i < 10; i++) {
            try {
                searchResult += `**${i + 1}** [${results[i].name}](${results[1].url}) - \`${results[i].formattedDuration}\`\n`
            }
            catch (error) {
                searchResult = "\n";
            }
        }
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`SearchResults for: ${music}`.substring(0, 256))
        embed.setColor(0x00FFFF)
        embed.setDescription(searchResult.substring(0, 2048))
        embed.setFooter("Enter anything else or wait 60 seconds to cancel")
        message.channel.send({ embeds: [embed] })
        const filter = m => m.author.id === message.author.id
        const collector = new Discord.MessageCollector(message.channel, { filter, max: 1, time: 60000, errors: ["time"] })
        collector.on("collect", (message) => {
            let userinput = message.content;
            if (Number(userinput) <= 0 || Number(userinput) > 10 || isNaN(parseInt(userinput))) {
                return message.reply("You answered an invalid number!");
            }
            bot.distube.play(message.member.voice.channel, results[userinput - 1].url, {
                member: message.member,
                textChannel: message.channel,
                message: message,
            })
        })
        // }
    }

}