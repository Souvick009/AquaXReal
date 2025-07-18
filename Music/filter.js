const Discord = require("discord.js");
const prefix = ">>"
const filters = [
    "clear",
    "lowbass",
    "bassboost",
    "purebass",
    "3D",
    "nightcore",
    "3D>>",
    "subboost",
    "8D"
]

module.exports = {
    name: "filter",
    aliases: ["f"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>filter",
    example: ">>filter",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.guild.me);
        if (!permissions.has('CONNECT')) return message.channel.send('I dont have the `Connect` permission in your voice channel');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the `Speak` permission in your voice channel');

        const novc = new Discord.EmbedBuilder()
        if (!message.guild.members.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return message.channel.send({ embeds: [novc] })
        }

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);
        const notPlaying = new Discord.EmbedBuilder()
        if (!queue || !queue.playing) {
            notPlaying.setColor("#FF0000");
            notPlaying.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPlaying.setTitle(`❌ ERROR | Can't Filter the song`);
            notPlaying.setDescription(`I'm not playing anything!`);
            return message.channel.send({ embeds: [notPlaying] })
        };

        if (message.guild.id == "679765534950424601") {
            if (message.guild.members.me.voice.channel.members >= 2) {
                if (message.author.roles.cache.some(r => r.id === "685843002123616256")) {
                    filteR()
                } else {
                    return message.reply(`You don't have the D.J role to set filters.`)
                }
            } else {
                filteR()
            }
        } else {
            filteR()
        }



        async function filteR() {
            const Filtertype = new Discord.EmbedBuilder()
            if (!args[0]) {
                Filtertype.setColor("#FF0000");
                Filtertype.setFooter(bot.user.username, bot.user.displayAvatarURL());
                Filtertype.setTitle(`❌ ERROR | Please add a Filtertype`);
                Filtertype.setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048));
                return message.channel.send({ embeds: [Filtertype] });
            };

            const validFiltertype = new Discord.EmbedBuilder()
            if (!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase())) {
                validFiltertype.setColor("#FF0000")
                validFiltertype.setFooter(bot.user.username, bot.user.displayAvatarURL())
                validFiltertype.setTitle(`❌ ERROR | Not a valid Filtertype`)
                validFiltertype.setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
                return message.channel.send({ embeds: [validFiltertype] });
            }
            const currentFilters = queue.filters
            if (currentFilters.includes(args[0].toLowerCase())) {
                queue.setFilter(args[0].toLowerCase());
                const Filterdone = new Discord.EmbedBuilder()
                Filterdone.setColor(message.guild.members.me.displayHexColor);
                Filterdone.setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
                Filterdone.setTitle(`✅ Successfully removed \`${args[0].toLowerCase()}\` filter`);
                return message.channel.send({ embeds: [Filterdone] });
            } else {
                queue.setFilter(args[0].toLowerCase());
                const Filterdone = new Discord.EmbedBuilder()
                Filterdone.setColor(message.guild.members.me.displayHexColor);
                Filterdone.setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
                Filterdone.setTitle(`✅ Successfully set Filter to: \`${args[0].toLowerCase()}\``);
                return message.channel.send({ embeds: [Filterdone] });
            }
        }
    }
}




