const { PermissionFlagsBits } = require("discord.js");
module.exports = async (bot, Discord, interaction) => {
    var args = []
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild || !interaction.guild.available) return
    const command = bot.commands.get(interaction.commandName)
    if (!command) return;
    if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.SendMessages])) return

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.SendMessages)) return

    if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.EmbedLinks])) return interaction.reply("❌ I don't have Embed Links permission!")

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) return interaction.reply("❌ I don't have Embed Links permission in this channel!")

    cmdRun = async (cmd) => {
        var options = []
        interaction.options._hoistedOptions.forEach(option => {

            options.push(option.value)
        });
        try {
            await cmd.run(bot, interaction, args, options, interaction.user)
        } catch (e) {
            console.log(e)
        }
    }

    return cmdRun(command)
}