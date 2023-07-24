const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "disconnect",
    accessableby: "Everyone",
    description: "Disconnects the bot from the voice channel",
    usage: "/disconnect",
    example: "/disconnect",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        var i = await message.deferReply()
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return i.edit({ embeds: [vc] })
        };

        const novc = new Discord.EmbedBuilder()
        if (!message.guild.members.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return i.edit({ embeds: [novc] })
        }

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return i.edit({ embeds: [samevc] })
        };

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                dc();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return i.edit({ embeds: [samevc] })
            }
        } else {
            dc();
        }

        async function dc() {
            bot.distube.voices.leave(message.guild)
            const embed1 = new Discord.EmbedBuilder();
            embed1.setColor(message.guild.members.me.displayHexColor);
            embed1.setDescription('Successfully Disconnected!');
            return i.edit({ embeds: [embed1] })
        }
    }
}