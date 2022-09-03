module.exports = async (bot, Discord, interaction) => {
    console.log(`${bot.user.username} is Online!`);
    bot.user.setPresence({
        activity: {
            name: `/help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
}