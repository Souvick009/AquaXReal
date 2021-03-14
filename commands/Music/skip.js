const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map

module.exports = {
    name: "skip",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>skip",
    example: ">>skip",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let queue = await bot.distube.getQueue(message);

        if (queue) {
            bot.distube.skip(message)

            const embed = new Discord.MessageEmbed();
            embed.setTitle("SKIPPED!");
            embed.setColor("#FFFF00");
            embed.setDescription(`Skipped the song!`);
            embed.setFooter(client.user.username, client.user.displayAvatarURL());
            embed.setTimestamp();

        } else if (!queue) {
            return
        };
    }

}