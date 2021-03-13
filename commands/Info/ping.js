const Discord = require("discord.js");
const PREFIX = '!';
module.exports = {
  name: "ping",
  aliases: [],
  accessableby: "Manage Messages",
  description: "Check ping of the bot",
  usage: "=ping",
  example: "=ping ",
  cooldown: 5,
  category: "Info",
  run: async (bot, message, args) => {


    message.channel.send('Loading data').then(async (msg) => {
      msg.delete()
      message.channel.send(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    })
  }


}