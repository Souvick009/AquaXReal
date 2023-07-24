const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require("discord.js");
module.exports = {
    name: "searchplay",
    aliases: ['sp'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
    cooldown: 5,
    category: "Music",
    options: [{
        name: "song",
        description: "Searches for a song and starts playing it.",
        required: true,
        type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        req: "user"
    }],
    run: async (bot, message, args, options, author) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
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
                return await i.edit(toSend)
            } else {
                return message.reply(toSend)
            }
        }
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.EmbedBuilder()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter({ text: "Requested by " + author.tag, iconURL: author.displayAvatarURL() });
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return sendM(message, { embeds: [vc] })
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has(PermissionFlagsBits.Connect)) return sendM(message, { content: 'Missing connect premission' });
        if (!permissions.has(PermissionFlagsBits.Speak)) return sendM(message, { content: 'Missing speak permission' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embeds: [samevc] })
        };

        const Searchterm = new Discord.EmbedBuilder()
        if (!options[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`/play <URL / TITLE>\``)
            return sendM(message, { embeds: [Searchterm] })
        };
        
        var req;
        if (message.type == 2) {
            req = options[0];
        } else {
            req = args.join(" ")
        }

        const search = new Discord.EmbedBuilder()
        search.setDescription(":mag: **Searching! **" + req)
        search.setColor("#FFFF00");

        var s
        try {
            s = await sendM(message, { embeds: [search] })
        } catch (err) {
            console.log(message)
            console.log(err)
        }

        const music = req
        let results;
        try {
            results = await bot.distube.search(music, {
                type: "video",
                limit: 10
            })
        } catch (err) {
            if (!results || err.errorCode == 'NO_RESULT') {
                const embed = new Discord.EmbedBuilder()
                embed.setColor("#FF0000");
                embed.setDescription(`:x: No result found for ${music}!`)
                return message.channel.send({ embeds: [embed] })
            }
        }

        let searchResult = "";

        for (i = 0; i < 10; i++) {
            try {
                searchResult += `**${i + 1})** [${results[i].name}](${results[1].url}) - \`${results[i].formattedDuration}\`\n`
            }
            catch (error) {
                searchResult = "\n";
            }
        }

        const embed = new Discord.EmbedBuilder()
        embed.setTitle(`SearchResults for: ${music}`.substring(0, 256))
        embed.setColor(message.guild.members.me.displayHexColor)
        embed.setDescription(searchResult.substring(0, 2048))
        embed.setFooter({ text: "Enter anything else or wait 30 seconds to cancel" })

        const one = new Discord.ButtonBuilder();
        one.setEmoji("1️⃣");
        one.setStyle(Discord.ButtonStyle.Primary);
        one.setCustomId("1");

        const two = new Discord.ButtonBuilder();
        two.setEmoji("2️⃣");
        two.setStyle(Discord.ButtonStyle.Primary);
        two.setCustomId("2");

        const three = new Discord.ButtonBuilder();
        three.setEmoji("3️⃣");
        three.setStyle(Discord.ButtonStyle.Primary);
        three.setCustomId("3");

        const four = new Discord.ButtonBuilder();
        four.setEmoji("4️⃣");
        four.setStyle(Discord.ButtonStyle.Primary);
        four.setCustomId("4");

        const five = new Discord.ButtonBuilder();
        five.setEmoji("5️⃣");
        five.setStyle(Discord.ButtonStyle.Primary);
        five.setCustomId("5");

        const six = new Discord.ButtonBuilder();
        six.setEmoji("6️⃣");
        six.setStyle(Discord.ButtonStyle.Primary);
        six.setCustomId("6");

        const seven = new Discord.ButtonBuilder();
        seven.setEmoji("7️⃣");
        seven.setStyle(Discord.ButtonStyle.Primary);
        seven.setCustomId("7");

        const eight = new Discord.ButtonBuilder();
        eight.setEmoji("8️⃣");
        eight.setStyle(Discord.ButtonStyle.Primary);
        eight.setCustomId("8");

        const nine = new Discord.ButtonBuilder();
        nine.setEmoji("9️⃣");
        nine.setStyle(Discord.ButtonStyle.Primary);
        nine.setCustomId("9");

        const ten = new Discord.ButtonBuilder();
        ten.setEmoji("🔟");
        ten.setStyle(Discord.ButtonStyle.Primary);
        ten.setCustomId("10");

        const cancel = new Discord.ButtonBuilder();
        cancel.setLabel("Cancel");
        cancel.setStyle(Discord.ButtonStyle.Danger);
        cancel.setCustomId("cancel");

        const buttonRow = new Discord.ActionRowBuilder().addComponents(one, two, three, four, five);
        const buttonRow1 = new Discord.ActionRowBuilder().addComponents(six, seven, eight, nine, ten);
        const buttonRow2 = new Discord.ActionRowBuilder().addComponents(cancel);
        const m = await message.channel.send({ embeds: [embed], components: [buttonRow, buttonRow1, buttonRow2], ephemeral: false });
        var f2 = 0;
        const filter = i => i.user.id === i.user.id
        const collector = m.createMessageComponentCollector({
            componentType: Discord.ComponentType.Button,
            filter,
            time: 30_000,
        });

        var flag = 0;

        collector.on("collect", async (interaction) => {
            if (interaction.user.id !== author.id) return interaction.reply({ content: "This is not your interaction", ephemeral: true })
            let userinput = interaction.customId;
            if (userinput == "cancel") {
                const Cancelled = new Discord.ButtonBuilder();
                Cancelled.setLabel("Cancelled");
                Cancelled.setStyle(Discord.ButtonStyle.Danger);
                Cancelled.setCustomId("cancelled");
                Cancelled.setDisabled(true);
                const buttonRow3 = new Discord.ActionRowBuilder().addComponents(Cancelled);
                flag = 1
                interaction.update({ embeds: [embed], components: [buttonRow3], ephemeral: false })
                search.setDescription(":x: **Search Cancelled! **" + options[0])
                search.setColor("#FF0000");
                s.edit({ embeds: [search] })
                return interaction.message.delete();
                
            } else if (Number(userinput) <= 0 || Number(userinput) > 10 || isNaN(parseInt(userinput))) {
                interaction.reply({ content: "You answered an invalid number!", ephemeral: true });
                flag = 1
                return interaction.message.delete();
            }
            bot.distube.play(interaction.member.voice.channel, results[userinput - 1].url, {
                member: interaction.member,
                textChannel: interaction.channel,
            })
            flag = 1
            //s.delete();
            return interaction.message.delete();
            // one.setDisabled(true)
            // two.setDisabled(true)
            // three.setDisabled(true)
            // four.setDisabled(true)
            // five.setDisabled(true)
            // six.setDisabled(true)
            // seven.setDisabled(true)
            // eight.setDisabled(true)
            // nine.setDisabled(true)
            // ten.setDisabled(true)
            // cancel.setDisabled(true)
            // const buttonRow = new Discord.ActionRowBuilder().addComponents(one, two, three, four, five);
            // const buttonRow1 = new Discord.ActionRowBuilder().addComponents(six, seven, eight, nine, ten);
            // const buttonRow2 = new Discord.ActionRowBuilder().addComponents(cancel);
            // interaction.update({ embeds: [embed], components: [buttonRow, buttonRow1, buttonRow2], ephemeral: false })
            // return interaction.reply({ embeds: [Playsong], ephemeral: false })
        })

        collector.on("end", async (interaction) => {
            if (flag == 0) {
                one.setDisabled(true)
                two.setDisabled(true)
                three.setDisabled(true)
                four.setDisabled(true)
                five.setDisabled(true)
                six.setDisabled(true)
                seven.setDisabled(true)
                eight.setDisabled(true)
                nine.setDisabled(true)
                ten.setDisabled(true)
                cancel.setDisabled(true)
                const buttonRow = new Discord.ActionRowBuilder().addComponents(one, two, three, four, five);
                const buttonRow1 = new Discord.ActionRowBuilder().addComponents(six, seven, eight, nine, ten);
                const buttonRow2 = new Discord.ActionRowBuilder().addComponents(cancel);
                await m.edit({ embeds: [embed], components: [buttonRow, buttonRow1, buttonRow2], ephemeral: false });
            } else
                return

        })
    }
}