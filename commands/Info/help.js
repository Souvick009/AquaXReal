const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "help",
    category: "Info",
    description: "Provides information and usage instructions for various commands.",
    usage: "<command>",
    example: "/help, /help volume, /help queue, /help play",
    accessableby: "Everyone",
    options: [{
        name: "command_name",
        description: "The command you want to know about",
        required: false,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
    run: async (bot, message, args, options, author) => {

        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.
        if (options[0]) {
            return getCMD(bot, message, options[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(bot, message, author);
        }
    },
};

async function getAll(bot, message, author) {
    const embed = new Discord.EmbedBuilder().setColor("#00fff3");

    // Map all the commands
    // with the specific category

    const commands = (category) => {
        return bot.commands.filter(cmd => cmd.category === category).filter(cmd => cmd.secret === false || !cmd.secret).map(cmd => `\`${cmd.name}\``).join(" | ");
    }
    const categories = ["Music", "Info"]
    // Map all the categories
    const lines = categories.map((category, name) => "**" + category + "**" + "\n" + commands(category)
    );
    // console.log(bot.categories)
    embed.setDescription(`${lines.join("\n")} \n For More Information Use **/help command** \n Example:- **/help play**`)
    embed.setFooter({ text: author.tag, iconURL: author.displayAvatarURL() })
    embed.setThumbnail(message.guild.iconURL())
    embed.setTimestamp()
    embed.setTitle("Here are the available commands you can use:")
    return send(message, { embeds: [embed] });
}

function getCMD(bot, message, input) {
    const embed = new Discord.EmbedBuilder();

    // Get the cmd by the name
    const cmd =
        bot.commands.get(input.toLowerCase())

    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        embed.setColor("RED")
        embed.setDescription(info)
        return send(message, { embeds: [embed] });
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.example) info += `\n**Example**: ${cmd.example}`;
    //if (cmd.accessableby) info += `\n**Accessableby**: ${cmd.accessableby}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter({ text: `Syntax: <> = required, [] = optional` });
    }
    embed.setColor(message.guild.members.me.displayHexColor)
    embed.setDescription(info)
    return send(message, { embeds: [embed] });
}