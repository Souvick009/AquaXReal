const Discord = require("discord.js");
const prefix = '>>';

module.exports = {
    name: "disconnect",
    aliases: ['dc'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>disconnect, >>dc",
    example: ">>disconnect, >>dc",
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

        const novc = new Discord.MessageEmbed()
        if (!message.guild.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return message.channel.send({ embeds: [novc] })
        }

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send({ embeds: [samevc] })
        };

        //if bot and the user is present in same vc then the bot will get disconnected
        if (channel === message.guild.me.voice.channel.id) {

            if (message.guild.id == "679765534950424601") {
                if (message.guild.me.voice.channel.members >= 2) {
                    if (message.author.roles.cache.some(r => r.id === "685843002123616256")) {
                        dc()
                    } else {
                        return message.reply(`You don't have the D.J role to set filters.`)
                    }
                } else {
                    dc()
                }
            } else {
                dc()
            }

            async function dc() {
                bot.distube.voices.leave(message.guild)
                const embed1 = new Discord.MessageEmbed();
                embed1.setColor("#FF0000");
                embed1.setDescription('Successfully Disconnected!');
                embed1.setTimestamp();
                return message.channel.send({ embeds: [embed1] })
            }
        };
    }
}