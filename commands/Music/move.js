const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "move",
    accessableby: "Everyone",
    description: "Moves a song from one position in the queue to another.",
    usage: "/remove",
    example: "/remove",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "from",
        description: "The number of the song which you want to move",
        required: true,
        type: 4, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }, {
        name: "to",
        description: "The position of the queue on which you want add the song",
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

        async function sendM(message, toSend) {
            if (message.type == 2) {
                return await message.edit(toSend)
            } else {
                return await message.reply(toSend)
            }
        }
        
        if (!message.member.voice.channel) return sendM(message,{ content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message,{ embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
                if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                    moveSong();
                } else {
                    const samevc = new Discord.EmbedBuilder()
                    samevc.setColor("#FF0000")
                    samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                    return sendM(message,{ embeds: [samevc] })
                }
            } else {
                moveSong();
            }

            async function moveSong() {
                if (isNaN(parseInt(options[0])) || !options[0]) return sendM(message,{ content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                let remove = options[0] //4
                let arr = queue.songs;
                if (remove > arr.length || remove < 0) { return sendM(message,{ content: 'Thats Not A Valid Number.' }) } // If Number Is Not Their In Queue
                var add = options[1] //1
                if (isNaN(parseInt(options[1])) || !options[1]) return sendM(message,{ content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                var removed = arr[remove]
                arr.splice(remove, 1)
                arr.splice(add, 0, removed)
                const embed = new Discord.EmbedBuilder()
                    .setDescription(`✅ Moved [${removed.name}](${removed.url}) from ${remove} to ${add}`)
                    .setColor(message.guild.members.me.displayHexColor)
                sendM(message,{ embeds: [embed] })
            }
        } else if (!queue) {
            return sendM(message,{ content: "Nothing is playing right now!" })
        };
    }

}