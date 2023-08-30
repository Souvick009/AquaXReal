module.exports = async (bot, Discord, interaction) => {
    console.log(`${bot.user.username} is Online!`);
    bot.user.setPresence({
        activities: [{
            name: "/play",
            type: Discord.ActivityType.Listening
        }],
        status: "idle"
    })
}