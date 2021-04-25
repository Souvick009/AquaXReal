const Discord = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>autoplay",
    example: ">>autoplay",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');


        const notPaused = new Discord.MessageEmbed()
        if (!bot.distube.isPlaying(message)) {
            notPaused.setColor("#FF0000");
            notPaused.setFooter(bot.user.username, bot.user.displayAvatarURL());
            notPaused.setTitle(`❌ ERROR | Cannot turn on autoplay mode`);
            notPaused.setDescription(`Play something first!`);
            return message.channel.send(notPaused)
        };

        let mode = bot.distube.toggleAutoplay(message);
        const autoplay = new Discord.MessageEmbed();
        autoplay.setTitle("Autoplay Mode Set To:");
        autoplay.setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        autoplay.setColor("#FFFF00");
        autoplay.setFooter(bot.user.username, bot.user.displayAvatarURL());
        autoplay.setTimestamp();
        message.channel.send(autoplay);

    }

}