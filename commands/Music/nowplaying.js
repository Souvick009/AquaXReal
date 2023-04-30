const Discord = require("discord.js");
const progressbar = require('string-progressbar');
const ms = require('ms');
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "nowplaying",
    accessableby: "Everyone",
    description: "Shows the details about the current song",
    usage: "/nowplaying",
    example: "/nowplaying",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        //function for creating a bar
        // const createBar = function (maxtime, currenttime, size = 15, line = "▬", slider = "🔶") {
        //    let bar = currenttime > maxtime ? [line.repeat(size / 2 * 2), (currenttime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (currenttime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (currenttime / maxtime)) + 1), currenttime / maxtime];
        //    if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        //    return `**[${bar[0]}]**\n**${new Date(currenttime).toISOString().substr(11, 8) + " / " + (maxtime == 0 ? " ◉ LIVE" : new Date(maxtime).toISOString().substr(11, 8))}**`;
        // }

        let queue = bot.distube.getQueue(message);
        if (queue) {

            let track = queue.songs[0];
            var duration;
            if (track.isLive) {
                duration = "`🔴 LIVE`"
            } else {

                // assaign values to total and current
                var total = track.formattedDuration;
                var current = queue.formattedCurrentTime;
                // console.log("current " + current)
                // console.log("Total " + total)
                var newTotal = total.replace(':', "")
                var newCurrent = current.replace(':', "")
                if (newTotal.includes(":")) {
                    newTotal = newTotal.replace(':', "")
                }
                if (newCurrent.includes(":")) {
                    newCurrent = newCurrent.replace(':', "")
                }
                // console.log(newTotal)
                // console.log(newCurrent)
                var totalperct = (newCurrent / newTotal) * 100
                if (totalperct < 6) totalperct = 2
                let bar;
                try {
                    bar = progressbar.splitBar(100, totalperct, 25); //createBar(total, current, size, line, slider);
                } catch (error) {
                    return console.log(totalperct, total)
                }
                duration = `\`${bar[0]}\` \n\`${current} / ${total}\``
            }



            // console.log(bar)
            // Call the createBar method, first two arguments are mandatory
            // size (length of bar) default to 40, line default to '▬' and slider default to 🔘
            // There you go, now you have progress bar and percentage returned in an array as string

            // Queue status template
            const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
            const nowplaying = new Discord.EmbedBuilder()
            nowplaying.setColor("#00ff00");
            nowplaying.setFooter({ text: author.tag, iconURL: author.displayAvatarURL() });
            nowplaying.setTitle(`Now playing :notes: ${track.name}`.substr(0, 256));
            nowplaying.setURL(track.url);
            nowplaying.setTimestamp()
            nowplaying.setThumbnail(track.thumbnail);
            nowplaying.addFields([
                { name: "Requested By: ", value: track.user.username, inline: true },
                { name: "Duration: ", value: duration, inline: true },
                { name: "QueueStatus", value: status(queue), inline: false }
            ])
            return send(message, { embeds: [nowplaying] })
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }
}