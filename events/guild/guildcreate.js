module.exports = async (bot, Discord, interaction) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setPresence({
        activity: {
            name: `/help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
        .catch(console.error);
}