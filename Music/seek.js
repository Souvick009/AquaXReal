const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ms = require("ms")
// const Song = require("distube/typings/Song");

module.exports = {
    name: "seek",
    aliases: ['seek'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>seek",
    example: ">>seek ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');

        let channel = message.member.voice.channelId;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channelId) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);

        const notPaused = new Discord.EmbedBuilder()
        if (!queue) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            notPaused.setDescription(`Play something first!`);
            return message.channel.send({ embeds: [notPaused] })
        };

        let track = queue.songs[0];

        var total = track.duration;

        const alreadyPaused = new Discord.EmbedBuilder()
        if (queue.paused) {
            alreadyPaused.setColor("#FF0000");
            alreadyPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            alreadyPaused.setTitle(`❌ ERROR | Cannot seek the Song`);
            alreadyPaused.setDescription(`First resume the song then try to seek!`);
            return message.channel.send({ embeds: [alreadyPaused] })
        };

        if (args[0].includes(":")) {
            var time = args[0].split(":")
            if (time.length == 2) {
                var min1 = `${time[0]}m`
                var sec1 = `${time[1]}s`
                var min = ms(min1)
                var sec = ms(sec1)
                var final1 = min + sec
                var final = final1 / 1000
                const embed1 = new Discord.EmbedBuilder()
                if (Number(final) > total) {
                    embed1.setColor("#FF0000")
                    embed1.setDescription(`❌ ERROR | Seeking out of Range`)
                    return message.channel.send({ embeds: [embed1] })
                }
                bot.distube.seek(message, Number(final));
                const seek = new Discord.EmbedBuilder()
                var minute;
                var second;
                var send;
                if (time[0] > 1) {
                    minute = "minutes"
                    if (time[1] > 1) {
                        second = "seconds"
                    } else {
                        second = "second"
                    }
                    send = `Seeked the song for \`${time[0]} ${minute} & ${time[1]} ${second}\``
                } else if (time[0] = 1 || time[0] < 1) {
                    minute = "minute"
                    if (time[1] > 1) {
                        second = "seconds"
                    } else {
                        second = "second"
                    }
                    send = `Seeked the song for \`${time[0]} ${minute} & ${time[1]} ${second}\``
                }

                seek.setDescription(send)
                seek.setColor("#00ff00");
                return message.channel.send({ embeds: [seek] })
            } else if (time.length === 3) {
                var hour1 = `${time[0]}h`
                var min1 = `${time[1]}m`
                var sec1 = `${time[2]}s`
                var hour = ms(hour1)
                var min = ms(min1)
                var sec = ms(sec1)
                var final1 = hour + min + sec
                var final = final1 / 1000
                const embed1 = new Discord.EmbedBuilder()
                if (Number(final) > total) {
                    embed1.setColor("#FF0000")
                    embed1.setDescription(`❌ ERROR | Seeking out of Range`)
                    return message.channel.send({ embeds: [embed1] })
                }
                bot.distube.seek(message, Number(final));
                const seek = new Discord.EmbedBuilder()
                var sendHour;
                var minute;
                var second;
                var send;
                if (time[0] > 1) {
                    sendHour = "hours"
                    if (time[1] > 1) {
                        minute = "minutes"
                        if (time[2] > 1) {
                            second = "seconds"
                        } else {
                            second = "second"
                        }
                    } else {
                        minute = "minute"
                        if (time[2] > 1) {
                            second = "seconds"
                        } else {
                            second = "second"
                        }
                    }
                    send = `Seeked the song for \`${time[0]} ${sendHour}, ${time[1]} ${minute} & ${time[2]} ${second}\``
                } else if (time[0] = 1 || time[0] < 1) {
                    sendHour = "hour"
                    if (time[1] > 1) {
                        minute = "minutes"
                        if (time[2] > 1) {
                            second = "seconds"
                        } else {
                            second = "second"
                        }
                    } else {
                        minute = "minute"
                        if (time[2] > 1) {
                            second = "seconds"
                        } else {
                            second = "second"
                        }
                    }
                    send = `Seeked the song for \`${time[0]} ${sendHour}, ${time[1]} ${minute} & ${time[2]} ${second}\``
                }

                seek.setDescription(send)
                seek.setColor("#00ff00");
                return message.channel.send({ embeds: [seek] })
            }

        } else if (args[0].includes("m".toLowerCase()) || args[0].includes("min".toLowerCase()) || args[0].includes("mins".toLowerCase()) || args[0].includes("minute".toLowerCase()) || args[0].includes("minutes".toLowerCase())) {
            var min = ms(args[0])
            const embed1 = new Discord.EmbedBuilder()
            if (Number(min) > total) {
                embed1.setColor("#FF0000")
                embed1.setDescription(`❌ ERROR | Seeking out of Range`)
                return message.channel.send({ embeds: [embed1] })
            }
            bot.distube.seek(message, Number(min / 1000));
            const seek = new Discord.EmbedBuilder()
            seek.setDescription(`Seeked the song for \`${ms(min, { long: true })}\``)
            seek.setColor("#00ff00");
            return message.channel.send({ embeds: [seek] })
        } else if (args[0].includes("s".toLowerCase()) || args[0].includes("sec".toLowerCase()) || args[0].includes("secs".toLowerCase()) || args[0].includes("second".toLowerCase()) || args[0].includes("seconds".toLowerCase())) {
            var sec = ms(args[0])
            const embed1 = new Discord.EmbedBuilder()
            if (Number((sec / 1000)) > total) {
                embed1.setColor("#FF0000")
                embed1.setDescription(`❌ ERROR | Seeking out of Range`)
                return message.channel.send({ embeds: [embed1] })
            }
            bot.distube.seek(message, Number((sec / 1000)));
            const seek = new Discord.EmbedBuilder()
            seek.setDescription(`Seeked the song for \`${ms((sec / 1000), { long: true })}\``)
            seek.setColor("#00ff00");
            return message.channel.send({ embeds: [seek] })
        } else {
            var sec = ms(args[0] + "s")
            if (sec == undefined) {
                return message.reply("Invalid Format!")
            }
            const embed1 = new Discord.EmbedBuilder()
            if (Number((sec / 1000)) > total) {
                embed1.setColor("#FF0000")
                embed1.setDescription(`❌ ERROR | Seeking out of Range`)
                return message.channel.send({ embeds: [embed1] })
            }
            bot.distube.seek(message, Number((sec / 1000)));
            const seek = new Discord.EmbedBuilder()
            seek.setDescription(`Seeked the song for \`${ms((sec / 1000), { long: true })}\``)
            seek.setColor("#00ff00");
            return message.channel.send({ embeds: [seek] })
        }

    }


}

