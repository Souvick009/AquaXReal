module.exports = async (bot, Discord, interaction) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setPresence({
        activities: [{
            name: "Lunar Lynx | /play",
            type: Discord.ActivityType.Listening
        }],
        status: "idle"
    })
        .catch(console.error);
}