const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
  name: "ping",
  accessableby: "Everyone",
  description: "Check ping of the bot",
  usage: "/ping",
  example: "/ping ",
  cooldown: 5,
  category: "Info",
  run: async (bot, message, args) => {

    var m = await message.reply({ content: "Loading.....", fetchReply: true })
    await message.editReply(`🏓Latency is \`${Math.round(bot.ws.ping)}ms\`.`)

  }


}