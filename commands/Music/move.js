const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "move",
    accessableby: "Everyone",
    description: "Moves the song from one position to another",
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
        if (!message.member.voice.channel) return send(message, { content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (queue) {

            moveSong()

            async function moveSong() {
                if (isNaN(parseInt(options[0])) || !options[0]) return send(message, { content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                let remove = options[0] //4
                let arr = queue.songs;
                if (remove > arr.length || remove < 0) { return send(message, { content: 'Thats Not A Valid Number.' }) } // If Number Is Not Their In Queue
                var add = options[1] //1
                if (isNaN(parseInt(options[1])) || !options[1]) return send(message, { content: 'Enter A Valid Number.\nUse `>>queue` To See Number Of the Song.' }) // If Number Is Not A Number or Not A Valid Number.
                var removed = arr[remove]
                arr.splice(remove, 1)
                arr.splice(add, 0, removed)
                const embed = new Discord.EmbedBuilder()
                    .setDescription(`✅ Moved [${removed.name}](${removed.url}) from ${remove} to ${add}`)
                    .setColor('#00ff00')
                send(message, { embeds: [embed] })
            }
        } else if (!queue) {
            return send(message, { content: "Nothing is playing right now!" })
        };
    }

}