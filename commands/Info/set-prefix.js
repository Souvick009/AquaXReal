const Discord = require("discord.js");
const PREFIX = '!';
const Prefix = require("../../models/prefix.js")
module.exports = {
  name: "setprefix",
  aliases: [],
  accessableby: "Manage Messages",
  description: "Check ping of the bot",
  usage: "=ping",
  example: "=ping ",
  cooldown: 5,
  category: "Info",
  run: async (bot, message, args) => {
    Prefix.findOne({
        serverId: message.guild.id,
    }, async (err, server) => {
        if (err) console.log(err);
        if (!server) {
            const newserver = new Prefix({
                serverId: message.guild.id,
                prefix: args[0],
            })
            await newserver.save().catch(e => console.log(e));
        } else if(server){
          server.prefix = args[0]
          await server.save().catch(e => console.log(e));
        }

        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
        

    })
   
    

  }


}