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
  run: async (bot, message, args, options, author) => {

    var m = await send(message, { content: "Loading....."})
    // console.log(m);
    await m.editReply(`🏓Latency is \`${Math.round(bot.ws.ping)}ms\`.`)

  }


}