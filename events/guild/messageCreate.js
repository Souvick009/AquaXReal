const { PermissionFlagsBits } = require("discord.js");
module.exports = async (bot, Discord, message) => {
    // if (message.author.id === "721460877005422634") return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.guild) return;
    if (!message.guild.available) return
    var prefix = ">>";

    //added condition that if message starts with bot ping
    if (message.content.startsWith(prefix) || message.content.startsWith("<@!815171627095556106>")) {
        //declaring args variable
        var args;
        //added this condition to customize arg according to prefix
        if (message.content.startsWith("<@!815171627095556106>")) { //remember to replace this id with your bot's id
            //22letters will be removed from arg if message starts with bot ping
            args = message.content.slice(22).trim().split(/ +/g);
        } else {
            //length of prefix will be removed from arg if message doesnt starts with bot ping
            args = message.content.slice(prefix.length).trim().split(/ +/g);
        }

        if (message.author.id === "530054630131105794" || message.author.id === "603508758626435072") {
            if (args[0].toLowerCase() == "servers") {
                message.reply(`Currently on ${bot.guilds.cache.size} Servers`)
            } else if (args[0].toLowerCase() == "pong") {
                message.channel.send('Loading data').then(async (msg) => {
                    msg.delete()
                    message.channel.send(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
                })
            }
        }

        //rest is the same code
        const cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;
        // Get the command
        let command = bot.commands.get(cmd);
        // If none is found, try to find it by alias
        if (!command) command = bot.commands.get(bot.aliases.get(cmd));
        var options;
        if (!command) return

        if (!message.guild.members.me.permissions.has([PermissionFlagsBits.SendMessages])) return

        if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.SendMessages)) return

        if (!message.guild.members.me.permissions.has([PermissionFlagsBits.EmbedLinks])) return message.channel.send({ content: "❌ I don't have **Embed Links** permission!" })

        if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) return message.channel.send({ content: "❌ I don't have **Embed Links** permission in this channel!" })

        if (!message.guild.members.me.permissions.has([PermissionFlagsBits.ReadMessageHistory])) return message.channel.send({ content: "❌ I don't have **Read Message History** permission!" })

        if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.ReadMessageHistory)) return message.channel.send({ content: "❌ I don't have **Read Message History** permission in this channel!" })

        return command.run(bot, message, args, options, message.author);

    }

}