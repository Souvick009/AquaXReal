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

    if (!message.member.permission.has("ADMINISTRATOR")) {
      const embed = new Discord.EmbedBuilder()
      embed.setColor(0xFF0000)
      embed.setDescription("❌ You don't have permissions to set prefix. Please contact a staff member.[Missing Permission:- Administrator]")
      return message.channel.send({ embeds: [embed] });
    }

    if (!args[0]) return message.reply({ content: "Please provide a argument to set prefix!" })
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

      message.channel.send({ content: `My new prefix is now **\`${args.join(" ")}\`**` });
    })

  }
}