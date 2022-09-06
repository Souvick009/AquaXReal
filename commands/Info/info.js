const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
  name: "info",
  description: "Returns info about Aqua X Real bot",
  usage: "<command>",
  example: "/info",
  accessableby: "None",
  category: "Info",
  run: async (bot, message, args) => {

    if (!message.guild.me.permissions.has(["EMBED_LINKS"])) return send(message, { content: "❌ I don't have Embed Links permission!" })

    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;

    // message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);

    const embed = new Discord.MessageEmbed()
      .setColor(0xe8fc03)
      .setAuthor({ name: `Information About ${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setDescription(bot.user.username)
      .addField(`:crown: __Creator/Owner__`, "Gaming Knights Z#1637")
      .addField(`:tools: __Developer Team__`, `\n:first_place: Gaming Knights Z#1637\n:second_place: Shander#6460`)
      .addField(`:gear: __Version__`, "Version 2.4.1")
      .addField(`⏰ __Uptime__`, `${days} days ${hours} hrs ${minutes} mins ${seconds} secs`)
      .addField(`Want To Invite Me In Your Server?`, "Actually you can't cuz this bot is under beta testing xD")
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
    send(message, { embeds: [embed] })
  }


}