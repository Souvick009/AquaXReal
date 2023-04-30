const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
module.exports = {
    name: "skip",
    accessableby: "Everyone",
    description: "Skips the current song",
    usage: "/skip",
    example: "/skip",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        if (!message.member.voice.channel) return send(message, { content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embdes: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if(!queue) {
            send(message, {content: "The Queue is Empty"})
        }

        skipSong()

        async function skipSong() {
            // if (queue.songs.length >= 2) {
            //     console.log(queue.songs.length)
            bot.distube.skip(message)
            // } else {
            //     const track = queue.songs[0]
            //     var total2 = track.formattedDuration;
            //     var total;
            //     if (total2.includes(`:`)) {
            //         let total1 = total2.split(`:`)
            //         console.log(total1)
            //         if (total1.length == 2) { // 1:30  // Minutes to Secs
            //             let min1 = `${total1[0]}m`
            //             let sec = total1[1]
            //             let min = ms(min1)
            //             console.log(`min1 ` + min)
            //             // let sec = ms(sec1)
            //             total = min + sec
            //             console.log(`tota69 ` + total)
            //         } else if (total1.length == 3) { // 1:20:30  //Hours to Secs
            //             let hou1 = `${total1[0]}h`
            //             let min1 = `${total1[1]}m`
            //             let sec = `${total1[2]}s`
            //             let hou = ms(hou1)
            //             let min = ms(min1)
            //             total = hou + min + sec
            //         } else {
            //             total = total1
            //         }
            //     }
            //     console.log(`total ` + parseFloat(total))
            //     bot.distube.seek(message, parseFloat(total))
            // }

            const embed = new Discord.EmbedBuilder();
            embed.setColor("#FFFF00");
            embed.setDescription(`⏭ Skipped the song!`)
            send(message, { embeds: [embed] })
        }


    }

}