const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "disconnect",
    accessableby: "Everyone",
    description: "For disconnecting the bot from your vc",
    usage: "/disconnect",
    example: "/disconnect",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] })
        };

        const novc = new Discord.MessageEmbed()
        if (!message.guild.me.voice.channel) {
            novc.setColor("#FF0000")
            novc.setTitle(`❌ ERROR | I am not connected with your voice channel`)
            novc.setDescription(`Channel Name: \`${message.member.voice.channel.name}\``)
            return send(message, { embeds: [novc] })
        }

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        dc()

        async function dc() {
            bot.distube.voices.leave(message.guild)
            const embed1 = new Discord.MessageEmbed();
            embed1.setColor("#FF0000");
            embed1.setDescription('Successfully Disconnected!');
            return send(message, { embeds: [embed1] })
        }
    }
}