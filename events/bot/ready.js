module.exports = async (bot, Discord, interaction) => {
    console.log(`${bot.user.username} is Online!`);
    bot.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    })
    bot.user.setPresence({
        activity: {
            name: `/help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
}