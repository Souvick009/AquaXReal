const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
  name: "ping",
  accessableby: "Everyone",
  description: "Measures the latency or response time of the bot.",
  usage: "/ping",
  example: "/ping ",
  cooldown: 5,
  category: "Info",
  run: async (bot, message, args, options, author) => {

    // await send(message, { content: `🏓Latency is \`${Math.round(bot.ws.ping)}ms\`.`})

    var m = await send(message, { content: "Loading....."})
    // console.log(m);
    await m.edit(`🏓Latency is \`${Math.round(bot.ws.ping)}ms\`.`)

  }


}