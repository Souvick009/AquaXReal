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
    const embed = new Discord.MessageEmbed()
      .setColor(0xe8fc03)
      .setAuthor(`Information About ${bot.user.username}`, bot.user.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setDescription(bot.user.username)
      .addField(`:crown: __Creator/Owner__`, "Gaming Knights Z#1637")
      .addField(`:tools: __Developer Team__`, `\n:first_place: Gaming Knights Z#1637\n:second_place: Shander#6460`)
      .addField(`:gear: __Version__`, "Version 2.4.1")
      .addField(`Want To Invite Me In Your Server?`, "Actually you can't cuz this bot is under beta testing xD")
      .setFooter(message.author.username, message.author.displayAvatarURL())
    message.channel.send(embed)
  }


}