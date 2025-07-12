const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
  name: "info",
  description: "Displays general information or details about the bot.",
  usage: "<command>",
  example: "/info",
  accessableby: "None",
  category: "Info",
  run: async (bot, message, args, options, author) => {

    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;

    // message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);

    const embed = new Discord.EmbedBuilder()
      .setColor(message.guild.members.me.displayHexColor)
      .setAuthor({ name: `Information About ${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setDescription(bot.user.username)
      .addFields(
        { name: `:crown: __Creator/Owner__`, value: "The Real Warrior!#2242" },
        { name: `:tools: __Developer Team__`, value: `\n:first_place: The Real Warrior!#2242\n:second_place: Shander#4911` },
        { name: `:gear: __Version__`, value: "Version 2.4.1" },
        { name: `⏰ __Uptime__`, value: `${days} days ${hours} hrs ${minutes} mins ${seconds} secs` },
        { name: `Want To Invite Me In Your Server?`, value: "Actually you can't cuz this bot is under beta testing xD" })
      .setFooter({ text: author.username, iconURL: author.displayAvatarURL() })
    send(message, { embeds: [embed] })
  }


}