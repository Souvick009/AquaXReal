module.exports = async (bot, Discord, interaction) => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setPresence({
        activity: {
            name: `/help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
        .catch(console.error);
}