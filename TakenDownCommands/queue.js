const Discord = require("discord.js");
const Utils = require("utils-discord");

module.exports = {
    name: "queue",
    aliases: ["q"],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>queue",
    example: ">>queue",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        let queue = await bot.distube.getQueue(message);

        //let curqueue


        if (queue) {
            //curqueue = queue.songs.map((song, id) =>
            //    `**${id + 1}**. ***${song.name}*** - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
            //).slice(0, 10).join("\n");

            // let embed = new Discord.MessageEmbed()
            // embed.setTitle(`Current Queue for: ${message.guild.name} (Total Duration: ${queue.formattedDuration})`);
            // embed.setColor("#FFFF00");
            // embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
            // embed.setTimestamp();

            let counter = 0;
            let toSend = []
            let queues = queue.songs
            queues.shift()
            queues.forEach((song, i) => {
                // let k = queue.songs;
                // let songs = k.slice(i, i + 10);
                toSend.push(`**${i + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n`)
            })

            let current = queue.songs[0];
            toSend.unshift(`Now playing \n [${current.name}](${current.url}) \n`)

            let options = {
                title: `Current Queue for: ${message.guild.name} (Total Duration: ${queue.formattedDuration})`,
                color: "#FFFF00",
                args: args[0],
                buttons: true,
                thumbnail: message.guild.iconURL(),
                perpage: 10
            }
            Utils.createEmbedPages(bot, message, toSend, options)
            // for (let i = 0; i < queue.songs.length; i += 10) {
            //     if (counter >= 10) break;
            //     let k = queue.songs;
            //     let editited = k.splice(0, 1)
            //     let current = queue.songs[0];
            //     let songs = editited.slice(i, i + 10);
            //     embed.setAuthor(`haalllo`)
            //     embed.setDescription(`Now playing \n [${current.name}](${current.url}) \n` + songs.map((song, index) => `**${index + 1 + counter * 10}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n`))
            //     message.channel.send(embed)
            //     counter++;
            // }
            //const currentqueue = new Discord.MessageEmbed();
            //currentqueue.setTitle("Current Queue!");
            //currentqueue.setDescription(curqueue);
            //currentqueue.setColor("#FFFF00");
            //currentqueue.setFooter(bot.user.username, bot.user.displayAvatarURL());
            //currentqueue.setTimestamp();
            //message.channel.send(currentqueue)
        } else if (!queue) {
            return message.channel.send("Nothing is playing right now!")
        };

    }

}