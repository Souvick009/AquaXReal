module.exports = async (bot, Discord, oldVoice, newVoice) => {
    const { botID } = require("../../index.js")
    if (oldVoice.member.id == botID) {
        if (newVoice.channelId)
            bot.distube.currentVoiceChannelId = newVoice.channelId
        if (oldVoice.channel && newVoice.channel) {
            bot.VibeSync.setVoiceStatus(newVoice.channelId, bot.distube._currentSongStatus).catch(err => console.error(err))
        }
    }

    if(newVoice.channel) {
        
    }

}