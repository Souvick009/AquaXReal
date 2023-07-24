const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")

module.exports = {
    name: "resume",
    accessableby: "Everyone",
    description: "Resumes playback after a pause.",
    usage: "/resume",
    example: "/resume",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args, options, author) => {
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return i.edit({ embeds: [vc] })
        };

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join **my** voice channel first`)
            samevc.setDescription(`Channelname: \`${message.guild.members.me.voice.channel.name}\``)
            return i.edit({ embeds: [samevc] })
        };

        let queue = bot.distube.getQueue(message);

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                resume();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return i.edit({ embeds: [samevc] })
            }
        } else {
            resume();
        }

        function resume() {
            const notPaused = new Discord.EmbedBuilder()
            if (queue.playing) {
                notPaused.setColor("#FF0000");
                notPaused.setTitle(`❌ ERROR | Cannot resume the Song`);
                notPaused.setDescription(`It's not paused!`);
                return i.edit({ embeds: [notPaused] })
            };
            //Function to wait some time
            const delay = function (delayInms) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(2);
                    }, delayInms);
                });
            }

            // bot.distube.resume(message);
            // await delay(100);
            // bot.distube.pause(message);
            // await delay(100);
            queue.resume(message);

            let track = queue.songs[0];

            const resumed = new Discord.EmbedBuilder()
            resumed.setColor(message.guild.members.me.displayHexColor);
            resumed.setDescription(`▶ Resumed the Song: [${track.name}](${track.url})`)
            return i.edit({ embeds: [resumed] })
        }
    }
}