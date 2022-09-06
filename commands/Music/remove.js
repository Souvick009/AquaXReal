const Discord = require("discord.js");
const skip = require("./skip")


module.exports = {
    name: "remove",
    aliases: [],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>remove",
    example: ">>remove",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "song_number",
        description: "the number of the song you want to remove",
        required: true,
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
    run: async (bot, message, args, options, author) => {
        if (!message.member.voice.channel) return send(message, { content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            removeSong()

            async function removeSong() {
                if (isNaN(parseInt(args[0])) || !args[0]) return send(message, { content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                let remove = args[0]
                let arr = queue.songs;
                if (remove > (arr.length - 1) || remove < 0) {
                    // If Number Is Not Their In Queue
                    return send(message, { content: 'Thats Not A Valid Number.' })
                }
                remove = args[0]
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Song Removed:`)
                    .setDescription(`[${arr[remove].name}](${arr[remove].url})`)
                    .setColor('#FFFF00')
                    .addField('Song Removed by:-', message.author.username)
                    .setTimestamp()
                    .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                send(message, { embeds: [embed] })
                if (remove === 0) {
                    skip.execute(message, args)
                }
                else {
                    arr.splice(remove, 1)
                }
            }
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }

}