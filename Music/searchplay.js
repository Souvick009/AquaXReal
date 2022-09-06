const Discord = require("discord.js");
const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "searchplay",
    aliases: ['sp'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
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
            vc.setFooter({ text: "Requested by " + message.author.tag, iconURL: message.author.displayAvatarURL() });
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return send(message, { content: 'Missing connect premission' });
        if (!permissions.has('SPEAK')) return send(message, { content: 'Missing speak permission' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!args[0]) {
            Searchterm.setColor("#FF0000")
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
        let results = await bot.distube.search(music, {
            type: "video",
            limit: 10
        })
        if (!results) {
            return send(message, { content: `No result found for ${music}!` })
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
        embed.setFooter({ text: "Enter anything else or wait 60 seconds to cancel" })
        message.channel.send({ embeds: [embed] })
        const filter = m => m.author.id === message.author.id
        const collector = new Discord.MessageCollector(message.channel, { filter, max: 1, time: 60000, errors: ["time"] })
        collector.on("collect", (message) => {
            let userinput = message.content;
            if (Number(userinput) <= 0 || Number(userinput) > 10 || isNaN(parseInt(userinput))) {
                return send(message, { content: "You answered an invalid number!" });
            }
            bot.distube.play(message.member.voice.channel, results[userinput - 1].url, {
                member: message.member,
                textChannel: message.channel,
            })
        })
    }
}