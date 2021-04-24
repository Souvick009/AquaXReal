const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const Prefix = require("../../models/prefix.js")
module.exports = {
    name: "help",
    aliases: ["h"],
    category: "Info",
    description: "Returns all commands, or one specific command info",
    usage: "<command | alias>",
    example: ">>help, >>help volume, >>help queue, >>help play",
    accessableby: "None",
    run: async (bot, message, args) => {

        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.
        if (args[0]) {
            return getCMD(bot, message, args[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(bot, message);
        }
    },
};

async function getAll(bot, message) {
    var prefix = ">>"

    Prefix.findOne({
        serverId: message.guild.id,

    }, async (err, server) => {
        if (err) console.log(err);
        if (!server) {
            prefix = ">>"
        } else if (server) {
            prefix = server.prefix
        }

        const embed = new Discord.MessageEmbed().setColor("#00fff3");

        // Map all the commands
        // with the specific category

        const commands = (category) => {
            return bot.commands.filter(cmd => cmd.category === category).filter(cmd => cmd.secret === false || !cmd.secret).map(cmd => `\`${cmd.name}\``).join(" | ");
        }
        const categories = ["Music", "Info"]
        // Map all the categories
        const lines = categories.map((category, name) => "**" + category + "**" + "\n" + commands(category)
        );
        console.log(bot.categories)
        return message.channel.send(embed.setDescription(`${lines.join("\n")} \n **Prefix** \n \`${prefix}\` \n For More Information Use **${prefix}help command** \n Example:- **${prefix}help play**`).setFooter(message.author.tag, message.author.displayAvatarURL()).setThumbnail(message.guild.iconURL()).setTimestamp().setTitle("Here are the available commands you can use:"));
    })
}

function getCMD(bot, message, input) {
    const embed = new Discord.MessageEmbed();

    // Get the cmd by the name or alias
    const cmd =
        bot.commands.get(input.toLowerCase()) ||
        bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases)
        info += `\n**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.example) info += `\n**Example**: ${cmd.example}`;
    if (cmd.accessableby) info += `\n**Accessableby**: ${cmd.accessableby}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("#00fff3").setDescription(info));
}