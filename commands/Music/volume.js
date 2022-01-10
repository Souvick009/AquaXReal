const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const prefix = ">>";

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "volume",
    aliases: ["vol", "v"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>volume",
    example: ">>volume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter({ text: "Requested by " + message.author.tag, iconURL: message.author.displayAvatarURL() });
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send({ embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };
        if (message.guild.id == "679765534950424601") {
            if (message.guild.me.voice.channel.members >= 2) {
                if (message.author.roles.cache.some(r => r.id === "685843002123616256")) {
                    setVolume()
                } else {
                    return message.reply(`You don't have the D.J role to set volume.`)
                }
            } else {
                setVolume()
            }
        } else {
            setVolume()
        }

        async function setVolume() {

            const embed = new Discord.MessageEmbed()
            if (!args[0]) {
                embed.setColor("#FF0000")
                embed.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                embed.setTitle(`❌ ERROR | You didn't provided a vaild volume number`)
                embed.setDescription(`Current Volume: \`${bot.distube.getQueue(message).volume}%\`\nUsage: \`${prefix}volume <0-200>\``)
                return message.channel.send({ embeds: [embed] })
            };

            const embed1 = new Discord.MessageEmbed()
            if (!(0 <= Number(args[0]) && Number(args[0]) <= 200)) {
                embed1.setColor("#FF0000")
                embed1.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                embed1.setTitle(`❌ ERROR | Volume out of Range`)
                embed1.setDescription(`Usage: \`${prefix}volume <0-200>\``)
                return message.channel.send({ embeds: [embed1] })
            };

            bot.distube.setVolume(message, Number(args[0]));

            const embed3 = new Discord.MessageEmbed()
            embed3.setTitle("VOLUME!");
            embed3.setColor("#FFFF00")
            embed3.setTimestamp();
            embed3.setDescription(`🔊 Changed the Volume to: \`${args[0]}%\``)
            embed3.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            return message.channel.send({ embeds: [embed3] })
        }

        // const embed4 = new Discord.MessageEmbed();
        // embed4.setTitle("VOLUME!");
        // embed4.setColor("#FFFF00");
        // embed4.setDescription(`Changed volume to \`${args[0]} %\``);
        // embed4.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() });
        // embed4.setTimestamp();
        // message.channel.send({ embeds: [embed4] })

        // return bot.distube.setVolume(message, Number(args[0]));
    }
}