const Discord = require("discord.js");
module.exports = {
  name: "info",
  aliases: ["botinfo"],
  description: "Returns info about Aqua X Real bot",
  usage: "<command | alias>",
  example: ">>info",
  accessableby: "None",
  category: "Info",
  run: async (bot, message, args) => {

    if (!message.guild.me.hasPermission(["EMBED_LINKS"])) return message.channel.send("❌ I don't have Embed Links permission!")

    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;

    // message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);

    const embed = new Discord.MessageEmbed()
      .setColor(0xe8fc03)
      .setAuthor(`Information About ${bot.user.username}`, bot.user.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setDescription(bot.user.username)
      .addField(`:crown: __Creator/Owner__`, "Gaming Knights Z#1637")
      .addField(`:tools: __Developer Team__`, `\n:first_place: Gaming Knights Z#1637\n:second_place: Shander#6460`)
      .addField(`:gear: __Version__`, "Version 2.4.1")
      .addField(`⏰ __Uptime__`, `${days} days ${hours} hrs ${minutes} mins ${seconds} secs`)
      .addField(`Want To Invite Me In Your Server?`, "Actually you can't cuz this bot is under beta testing xD")
      .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send(embed)
  }


}