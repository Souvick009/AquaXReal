const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js");
const { PermissionFlagsBits } = require("discord.js");
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
        choices: [
            {
                name: "Clear",
                value: "clear"
            },
            {
                name: "Low Bass",
                value: "lowbass"
            },
            {
                name: "Bass Boost",
                value: "bassboost"
            }, {
                name: "Pure Bass",
                value: "purebass"
            }, {
                name: "3D",
                value: "3d"
            }, {
                name: "Nightcore",
                value: "nightcore"
            }, {
                name: "3D>>",
                value: "3d>>"
            }, {
                name: "Sub Boost",
                value: "subboost"
            },
        ]
    }],
    run: async (bot, message, args, options, author) => {

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return send(message, { embeds: [vc] });
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return send(message, { content: 'I don\'t have CONNECT permission in that voice channel' });
        if (!permissions.has(PermissionFlagsBits.Speak)) return send(message, { content: 'I don\'t have SPEAK permission in that voice channel' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setDescription(`❌ ERROR | Please join **my** voice channel first\nChannelname: \`${message.guild.members.me.voice.channel.name}\``)
            return send(message, { embeds: [samevc] });
        };

        let queue = await bot.distube.getQueue(message);
        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                filter();
            } else {
                const samevc = new Discord.EmbedBuilder()
                samevc.setColor("#FF0000")
                samevc.setDescription(`❌ ERROR | You need to have the D.J. role in order to use the command while have more than 2 members in the vc`)
                return send(message, { embeds: [samevc] })
            }
        } else {
            filter();
        }

        function filter() {
            const notPlaying = new Discord.EmbedBuilder()
            if (!queue.playing) {
                notPlaying.setColor("#FF0000");
                notPlaying.setDescription(`❌ ERROR | Can't Filter the song\nI'm not playing anything!`);
                return send(message, { embeds: [notPlaying] });
            };

            const Filtertype = new Discord.EmbedBuilder()
            if (!options[0]) {
                Filtertype.setColor("#FF0000");
                Filtertype.setTitle(`❌ ERROR | Please add a Filtertype`);
                Filtertype.setDescription(`Usage: \`/filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048));
                return send(message, { embeds: [Filtertype] });
            };
            let input;
            const validFiltertype = new Discord.EmbedBuilder()
            if (!filters.join(" ").toLowerCase().split(" ").includes(options[0].toLowerCase())) {
                validFiltertype.setColor("#FF0000")
                validFiltertype.setTitle(`❌ ERROR | Not a valid Filtertype`)
                validFiltertype.setDescription(`Usage: \`/filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
                return send(message, { embeds: [validFiltertype] });
            }

            input = options[0].toLowerCase();
            if (input == "clear") {
                queue.filters.add("clear", true);
                const Filterdone = new Discord.EmbedBuilder()
                Filterdone.setColor(message.guild.members.me.displayHexColor);
                Filterdone.setTitle(`✅ Successfully cleared the filters`);
                return send(message, { embeds: [Filterdone] });
            } else {
                if (queue.filters.names.includes(input)) {
                    queue.filters.remove(input);
                    const Filterdone = new Discord.EmbedBuilder()
                    Filterdone.setColor(message.guild.members.me.displayHexColor);
                    Filterdone.setTitle(`✅ Successfully removed filter : \`${options[0]}\``);
                    return send(message, { embeds: [Filterdone] });
                } else {
                    queue.filters.add(input);
                    const Filterdone = new Discord.EmbedBuilder()
                    Filterdone.setColor(message.guild.members.me.displayHexColor);
                    Filterdone.setTitle(`✅ Successfully set filter to: \`${options[0]}\``);
                    return send(message, { embeds: [Filterdone] });
                }
            }
        }
    }

}