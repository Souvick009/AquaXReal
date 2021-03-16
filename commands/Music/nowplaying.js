const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>nowplaying",
    example: ">>np , >> nowplaying",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send(vc)
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        //function for creating a bar
        let createBar = function (maxtime, currentTime, size = 25, line = "▬", slider = "🔶") {
            let bar = currentTime > maxtime ? [line.repeat(size / 2 * 2), (currentTime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (currentTime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (currentTime / maxtime)) + 1), currentTime / maxtime];
            if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
            return `**[${bar[0]}]**\n**${new Date(currentTime).toISOString().substr(11, 8) + " / " + (maxtime == 0 ? " ◉ LIVE" : new Date(maxtime).toISOString().substr(11, 8))}**`;
        }

        let queue = bot.distube.getQueue(message);
        let track = queue.songs[0];

        // Queue status template
        const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;

        const nowplaying = new Discord.MessageEmbed()
        nowplaying.setColor("#00ff00");
        nowplaying.setFooter(message.author.tag, message.author.displayAvatarURL());
        nowplaying.setTitle(`Now playing :notes: ${track.name}`.substr(0, 256));
        nowplaying.setURL(track.url);
        nowplaying.setThumbnail(track.thumbnail);
        nowplaying.addField("Views", `▶ ${track.views}`, true);
        nowplaying.addField("Likes", `:thumbsup: ${track.likes}`, true);
        nowplaying.addField("Dislikes", `:thumbsdown: ${track.dislikes}`, true);
        nowplaying.addField("QueueStatus", status(queue));
        nowplaying.addField("Duration: ", createBar(queue.currentTime));
        return message.channel.send(nowplaying)
    }
}