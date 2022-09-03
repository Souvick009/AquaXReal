module.exports = async (bot, Discord, interaction) => {
    var args = []
    if (!interaction.isCommand()) return;
    if (!interaction.guild || !interaction.guild.available) return
    const command = bot.commands.get(interaction.commandName)
    if (!command) return;
    if (!interaction.guild.me.permissions.has(["SEND_MESSAGES"])) return

    if (!interaction.channel.permissionsFor(interaction.guild.me).has("SEND_MESSAGES")) return

    if (!interaction.guild.me.permissions.has(["EMBED_LINKS"])) return interaction.reply("❌ I don't have Embed Links permission!")

    if (!interaction.channel.permissionsFor(interaction.guild.me).has("EMBED_LINKS")) return interaction.reply("❌ I don't have Embed Links permission in this channel!")

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