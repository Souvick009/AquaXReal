const Discord = require("discord.js");
const skip = require("./skip")
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "remove",
    accessableby: "Everyone",
    description: "Removes a song from the queue",
    usage: "/remove",
    example: "/remove",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "song_number",
        description: "Removes a specific song from the queue.",
        required: true,
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
    run: async (bot, message, args, options, author) => {
        if (message.type == 2) {
            try {
                var i = await message.deferReply()
            } catch (err) {
                console.log(message)
            }
            options = options
        } else {
            options = args
        }

        function sendM(message, toSend) {
            if (message.type == 2) {
                i.edit(toSend)
            } else {
                message.reply(toSend)
            }
        }
        if (!message.member.voice.channel) return sendM(message,{ content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
                if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                    removeSong();
                } else {
                    const samevc = new Discord.EmbedBuilder()
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                    return sendM(message,{ embeds: [samevc] })
                }
            } else {
                removeSong();
            }

            async function removeSong() {
                if (isNaN(parseInt(options[0])) || !options[0]) return sendM(message,{ content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                let remove = options[0]
                let arr = queue.songs;
                if (remove > (arr.length - 1) || remove < 0) {
                    // If Number Is Not Their In Queue
                    return sendM(message,{ content: 'Thats Not A Valid Number.' })
                }
                remove = options[0]
                const embed = new Discord.EmbedBuilder()
                    .setTitle(`Song Removed:`)
                    .setDescription(`[${arr[remove].name}](${arr[remove].url})`)
                    .setColor(message.guild.members.me.displayHexColor)
                    .addFields({ name: 'Song Removed by:-', value: author.username })
                    .setTimestamp()
                    .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                sendM(message,{ embeds: [embed] })
                if (remove === 0) {
                    skip.execute(message, args)
                }
                else {
                    arr.splice(remove, 1)
                }
            }
        } else if (!queue) {
            return sendM(message,{ content: "Nothing is playing right now!" })
        };
    }

}