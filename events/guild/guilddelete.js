module.exports = async (bot, Discord, interaction) => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setPresence({
        activities: [{
            name: "Lunar Lynx | /play",
            type: Discord.ActivityType.Listening
        }],
        status: "idle"
    })
        .catch(console.error);
}