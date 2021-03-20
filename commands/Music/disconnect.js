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
    run: async (bot, message, args) => {

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
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
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        if (!message.guild.me.voice.channel) return message.channel.send(`I am not connected with \`${message.member.voice.channel.name}\``)

        //if bot and the user is present in same vc then the bot will get disconnected
        if (channel === message.guild.me.voice.channel.id) {
            message.guild.me.voice.channel.leave();
            const embed1 = new Discord.MessageEmbed();
            embed1.setTitle("⏹ STOPPED!");
            embed1.setColor("#FF0000");
            embed1.setDescription('Successfully Disconnected!');
            embed1.setFooter(bot.user.username, bot.user.displayAvatarURL());
            embed1.setTimestamp();
            return message.channel.send(embed1)
        };
    }
}