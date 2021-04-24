const Discord = require("discord.js");
const PREFIX = '!';
const Prefix = require("../../models/prefix.js")
module.exports = {
  name: "setprefix",
  aliases: ["prefix"],
  accessableby: "Manage Messages",
  description: "Check ping of the bot",
  usage: "=ping",
  example: "=ping ",
  cooldown: 5,
  category: "Info",
  run: async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const embed = new Discord.MessageEmbed()
      embed.setColor(0xFF0000)
      embed.setDescription("❌ You don't have permissions to clear warns. Please contact a staff member.[Missing Permission:- Administrator]")
      return message.channel.send(embed);
  }

    if (!args[0]) return message.reply("Please provide a argument to set prefix!")
    Prefix.findOne({
      serverId: message.guild.id,
    }, async (err, server) => {
      if (err) console.log(err);
      if (!server) {
        const newserver = new Prefix({
          serverId: message.guild.id,
          prefix: args.join(" "),
        })
        await newserver.save().catch(e => console.log(e));
      } else if (server) {
        server.prefix = args.join(" ")
        await server.save().catch(e => console.log(e));
      }

      message.channel.send(`My new prefix is now **\`${args.join(" ")}\`**`);


    })



  }


}