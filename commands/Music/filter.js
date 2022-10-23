const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js");
const filters = [
    "clear",
    "lowbass",
    "bassboost",
    "purebass",
    "3D",
    "nightcore",
    "3D>>",
    "subboost",
    "8D",
    "mcompand"
]

module.exports = {
    name: "filter",
    accessableby: "Everyone",
    description: "Adds or removes filters from the queue",
    usage: "/filter",
    example: "/filter",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "filter",
        description: "The filter name",
        required: true,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user",
        //     choices: [
        //         {
        //             name: "add",
        //             value: "add"
        //         },
        //         {
        //             name: "remove",
        //             value: "remove"
        //         },
        //         {
        //             name: "clear",
        //             value: "clear"
        //         },
        //     ]
        // }, {
        //     name: "filter",
        //     description: "The filter name",
        //     required: true,
        //     type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        //     req: "user"
    }],
    run: async (bot, message, args, options, author) => {

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] });
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return send(message, { content: 'I don\'t have CONNECT permission in that voice channel' });
        if (!permissions.has('SPEAK')) return send(message, { content: 'I don\'t have SPEAK permission in that voice channel' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setDescription(`❌ ERROR | Please join **my** voice channel first\nChannelname: \`${message.guild.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] });
        };

        let queue = await bot.distube.getQueue(message);

        const notPlaying = new Discord.MessageEmbed()
        if (!queue.playing) {
            notPlaying.setColor("#FF0000");
            notPlaying.setDescription(`❌ ERROR | Can't Filter the song\nI'm not playing anything!`);
            return send(message, { embeds: [notPlaying] });
        };

        const Filtertype = new Discord.MessageEmbed()
        if (!options[0]) {
            Filtertype.setColor("#FF0000");
            Filtertype.setTitle(`❌ ERROR | Please add a Filtertype`);
            Filtertype.setDescription(`Usage: \`/filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048));
            return send(message, { embeds: [Filtertype] });
        };
        let input;
        const validFiltertype = new Discord.MessageEmbed()
        if (!filters.join(" ").toLowerCase().split(" ").includes(options[0].toLowerCase())) {
            validFiltertype.setColor("#FF0000")
            validFiltertype.setTitle(`❌ ERROR | Not a valid Filtertype`)
            validFiltertype.setDescription(`Usage: \`/filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
            return send(message, { embeds: [validFiltertype] });
        }

        input = options[0].toLowerCase();
        if (input == "clear") {
            bot.distube.setFilter(message, "clear", true);
        } else {
            if (queue.filters.includes(input)) {
                bot.distube.setFilter(message, input);
                const Filterdone = new Discord.MessageEmbed()
                Filterdone.setColor("#00ff00");
                Filterdone.setTitle(`✅ Successfully removed filter : \`${options[0]}\``);
                return send(message, { embeds: [Filterdone] });
            } else {
                bot.distube.setFilter(message, input);
                const Filterdone = new Discord.MessageEmbed()
                Filterdone.setColor("#00ff00");
                Filterdone.setTitle(`✅ Successfully set filter to: \`${options[0]}\``);
                return send(message, { embeds: [Filterdone] });
            }
        }

        // if (options[0] == "add") {
        //     console.log(input)
        //     queue.filters.add(input);

        //     const Filterdone = new Discord.MessageEmbed()
        //     Filterdone.setColor("#00ff00");
        //     Filterdone.setTitle(`✅ Successfully set Filter to: \`${options[1]}\``);
        //     return send(message, { embeds: [Filterdone] });

        // } else if (options[0] == "remove") {
        //     if (!queue.filters.has(input)) {
        //         let embedError = new Discord.MessageEmbed();
        //         embedError.setDescription(`The filter \`${options[1]}\` is not present in the filters queue`);
        //         embedError.setColor("#FF0000")
        //         return send(message, { embeds: [embedError] });
        //     }
        //     queue.filters.remove(input);

        //     const Filterdone = new Discord.MessageEmbed()
        //     Filterdone.setColor("#00ff00");
        //     Filterdone.setTitle(`✅ Successfully removed the filter : \`${options[1]}\``);
        //     return send(message, { embeds: [Filterdone] });

        // } else if (options[0] == "clear") {
        //     queue.filters.add(input);

        //     const Filterdone = new Discord.MessageEmbed()
        //     Filterdone.setColor("#00ff00");
        //     Filterdone.setTitle(`✅ Successfully cleared filters`);
        //     return send(message, { embeds: [Filterdone] });

        // }


    }

}