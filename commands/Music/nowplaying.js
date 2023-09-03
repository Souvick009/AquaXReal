const Discord = require("discord.js");
const progressbar = require('string-progressbar');
const ms = require('ms');
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "nowplaying",
    aliases: ['np'],
    accessableby: "Everyone",
    description: "Displays information about the currently playing song.",
    usage: "/nowplaying",
    example: "/nowplaying",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (message.type == 2) {
            try {
                var i = await message.deferReply()
            } catch (err) {
                console.log(message)
            }
        }

        async function sendM(message, toSend) {
            if (message.type == 2) {
                return await message.edit(toSend)
            } else {
                let m = await message.channel.messages.fetch(message.id);
                try {
                    return await message.reply(toSend);
                } catch (err) {
                    return message.channel.send(toSend);
                }
            }
        }
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message, { embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
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
                    bar = progressbar.splitBar(100, totalperct, 10); //createBar(total, current, size, line, slider);
                } catch (error) {
                    return console.log(totalperct, total)
                }
                // console.log(bar, bar[0] + '\n')
                var split = bar[0].split("🔘");
                // console.log(split[0] + '\n' + split[1])
                var bar1;

                if (split[1] == undefined) {  // [ '▬▬▬▬▬▬▬▬▬▬' ]      🔘▬▬▬▬▬▬▬▬▬▬
                    // if (!split[0])
                    bar1 = `🔘${split[0]}`
                    // else
                    //     bar1 = `🔘${split[0]}`
                    // console.log('1')
                } else if (split[0] == '') { // [ '', '▬▬▬▬▬▬▬▬▬▬' ]   🔘▬▬▬▬▬▬▬▬▬▬
                    bar1 = `${bar[0]}`
                } else if (split[1] == '') { // [ '▬▬▬▬▬▬▬▬▬', '' ]     ▬▬▬▬▬▬▬▬▬🔘
                    bar1 = `[${split[0]}](${track.url})🔘`
                }
                else {
                    bar1 = `[${split[0]}](${track.url})🔘${split[1]}`
                }
                console.log(split)
                console.log(bar[0])
                console.log(`🔘${bar[0]}`)
                console.log(`${bar[0]}🔘`)
                console.log(bar1)

                duration = `${bar1}\n${current} / ${total}`
            }



            // console.log(bar)
            // Call the createBar method, first two arguments are mandatory
            // size (length of bar) default to 40, line default to '▬' and slider default to 🔘
            // There you go, now you have progress bar and percentage returned in an array as string

            // Queue status template
            const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
            const nowplaying = new Discord.EmbedBuilder()
            nowplaying.setColor(message.guild.members.me.displayHexColor);
            nowplaying.setDescription(`[:notes: ${track.name}](${track.url})`)
            nowplaying.setFooter({ text: `Requested By: ${track.user.username}`, iconURL: track.user.displayAvatarURL() });
            // nowplaying.setTitle(`Now playing`);
            nowplaying.setAuthor({ iconURL: bot.user.displayAvatarURL(), name: "Now Playing" })
            nowplaying.setTimestamp()
            nowplaying.setThumbnail(track.thumbnail);
            nowplaying.addFields([
                { name: "Duration: ", value: duration, inline: false },
                { name: "QueueStatus", value: status(queue), inline: false }
            ])
            return sendM(message, { embeds: [nowplaying] })
        } else if (!queue) {
            return sendM(message, { content: "Nothing is playing right now!" })
        };
    }
}