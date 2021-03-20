const Discord = require("discord.js");
const prefix = ">>"
const filters = [
    "clear",
    "lowbass",
    "bassboost",
    "purebass",
    "4D",
    "nightcore",
    "beats",
    "4D>>",
    "subboost",
    "8D",
    "mcompand"
]

module.exports = {
    name: "filter",
    aliases: [""],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>filter",
    example: ">>filter",
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

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        const Filtertype = new Discord.MessageEmbed()
        if (!args[0]) {
            Filtertype.setColor("#FF0000");
            Filtertype.setFooter(bot.user.username, bot.user.displayAvatarURL());
            Filtertype.setTitle(`❌ ERROR | Please add a Filtertype`);
            Filtertype.setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nExample: \`${prefix}filter bassboost\``);
            return message.channel.send(Filtertype);
        };

        const validFiltertype = new Discord.MessageEmbed()
        if (!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase())) {
            validFiltertype.setColor("#FF0000")
            validFiltertype.setFooter(bot.user.username, bot.user.displayAvatarURL())
            validFiltertype.setTitle(`❌ ERROR | Not a valid Filtertype`)
            validFiltertype.setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
            return message.channel.send(validFiltertype);
        }
        bot.distube.setFilter(message, args[0]);

        const Filterdone = new Discord.MessageEmbed()
        Filterdone.setColor("#00ff00");
        Filterdone.setFooter(message.author.tag, message.author.displayAvatarURL());
        Filterdone.setTitle(`✅ Successfully set Filter to: \`${args[0]}\``);
        return message.channel.send(Filterdone);
    }

}




