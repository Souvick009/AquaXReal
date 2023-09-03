const Discord = require("discord.js");
const send = require("../../utils/sendMessage.js")
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "skip",
    aliases: ['s'],
    accessableby: "Everyone",
    description: "Skips the current song and moves to the next one in the queue.",
    usage: "/skip",
    example: "/skip",
    cooldown: 5,
    category: "Music",
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
                let m = await message.channel.messages.fetch(message.id);
                try {
                    return await message.reply(toSend);
                } catch (err) {
                    return message.channel.send(toSend);
                }
            }
        }
        if (!message.member.voice.channel) return sendM(message, { content: 'You must be in a voice channel to use this command.' });

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.EmbedBuilder()
        if (bot.distube.getQueue(message) && channel !== message.guild.members.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.members.me.voice.channel.name}\``)
            return sendM(message, { embdes: [samevc] })
        };

        let queue = await bot.distube.getQueue(message);

        if (!queue) {
            sendM(message, { content: "The Queue is Empty" })
        }

        if ((message.guild.members.me.voice.channel.members.size - 1) > 2) {
            if (message.member.roles.cache.has("685843002123616256") || message.member.roles.cache.has("684653909419229204") || message.member.permissions.has([PermissionFlagsBits.Administrator])) {
                skipSong();
            } else {
                const yes = new Discord.ButtonBuilder();
                yes.setEmoji("✅");
                yes.setStyle(Discord.ButtonStyle.Danger);
                yes.setCustomId("yes");

                const no = new Discord.ButtonBuilder();
                no.setEmoji("❌");
                no.setStyle(Discord.ButtonStyle.Success);
                no.setCustomId("no");

                const buttonRow = new Discord.ActionRowBuilder().addComponents(yes, no);
                var vote = 1;
                var deny = 0;
                const embed = new Discord.EmbedBuilder();
                embed.setColor(message.guild.members.me.displayHexColor);
                embed.setDescription(`⏭ VoteSkip : ${vote}/${message.guild.members.me.voice.channel.members.size - 1}`)
                const m = await send(message, { embeds: [embed], components: [buttonRow], fetchReply: true });
                const filter = (i) => i.user.id === i.user.id;
                const collector = m.createMessageComponentCollector({
                    componentType: Discord.ComponentType.Button,
                    filter,
                    time: 30_000,
                });
                var flag = false, arr = new Array(), arr1 = new Array(), i = 0, j = 0, tm = false
                collector.on("collect", async (interaction) => {
                    var arr = message.guild.members.me.voice.channel.members.map(m => m.id)
                    var f1 = 0;
                    for (i = 0; i < arr.length; i++) {
                        if (interaction.user.id == arr[i]) {
                            f1 = 1;
                            break;
                        }
                    }
                    if (f1 == 0)
                        return interaction.reply({ content: `<@${interaction.user.id}> This is not your interation, you are not in the vc.` });
                    if (interaction.customId == 'yes') {
                        if (interaction.user.id == author.id) {
                            return interaction.reply({ content: "You cant vote twice!", ephemeral: true })
                        }
                        if (interaction.member.roles.cache.has("685843002123616256") || interaction.member.roles.cache.has("684653909419229204") || interaction.member.permissions.has([PermissionFlagsBits.Administrator])) {
                            try {
                                bot.distube.skip(message)
                            } catch (err) {
                                console.log(err);
                            }
                            flag = 1;
                            const embed = new Discord.EmbedBuilder();
                            embed.setColor(message.guild.members.me.displayHexColor);
                            embed.setDescription(`⏭ Skipped the song!`);
                            return await interaction.update({ embeds: [embed], components: [] })
                        }
                        if (i == 0) {
                            arr[i] = interaction.user.id
                            i++;
                        } else {
                            for (k = 0; k <= i; k++) {
                                if (interaction.user.id == arr[k]) {
                                    interaction.reply({ content: "You cant vote twice!", ephemeral: true })
                                    tm = true;
                                    break;
                                }
                            }
                            i++;
                            if (!tm) {
                                arr[i] = interaction.user.id
                            } else {
                                return
                            }
                            tm = false
                        }
                        const size = message.guild.members.me.voice.channel.members.size - 1;
                        vote++;
                        if (vote >= Math.round((size / 2))) {
                            try {
                                bot.distube.skip(message)
                            } catch (err) {

                            }
                            flag = 1
                            const embed = new Discord.EmbedBuilder();
                            embed.setColor(message.guild.members.me.displayHexColor);
                            embed.setDescription(`⏭ Skipped the song!`)
                            return await interaction.update({ embeds: [embed], components: [] })
                        } else {
                            embed.setColor(message.guild.members.me.displayHexColor);
                            embed.setDescription(`⏭ VoteSkip : ${vote}/${message.guild.members.me.voice.channel.members.size - 1}`)
                            await interaction.update({ embeds: [embed], components: [buttonRow] });
                        }
                    } else if (interaction.customId == 'no') {
                        if (interaction.user.id == author.id) {
                            return interaction.reply({ content: "You cant vote twice!", ephemeral: true })
                        }
                        if (j = 0) {
                            arr1[j] = interaction.user.id
                            j++
                        } else {
                            for (k = 0; k <= j; k++) {
                                if (interaction.user.id == arr1[j]) {
                                    interaction.reply({ content: "You cant vote twice!", ephemeral: true })
                                    tm = true;
                                    break;
                                }
                            }
                            j++
                            if (!tm) {
                                arr1[j] = interaction.user.id
                            } else {
                                return
                            }
                            tm = false
                        }
                        const size = message.guild.members.me.voice.channel.members.size - 1;
                        deny++;
                        if (deny > vote) {
                            yes.setDisabled(true);
                            no.setDisabled(true);
                            embed.setColor(message.guild.members.me.displayHexColor);
                            embed.setDescription(`⏭ VoteSkip : ${vote}/${message.guild.members.me.voice.channel.members.size - 1}\nNot enough vote to skip the song!`)
                            await interaction.update({ embeds: [embed], components: [] });
                        } else {
                            embed.setColor(message.guild.members.me.displayHexColor);
                            embed.setDescription(`⏭ VoteSkip : ${vote}/${message.guild.members.me.voice.channel.members.size - 1}`)
                            await interaction.update({ embeds: [embed], components: [buttonRow] });
                        }
                    }
                })

                collector.on("end", async (interaction) => {
                    if (!flag) {
                        embed.setColor(message.guild.members.me.displayHexColor);
                        embed.setDescription(`⏭ VoteSkip : ${vote}/${message.guild.members.me.voice.channel.members.size - 1}\nNot enough vote to skip the song!`)
                        await m.edit({ embeds: [embed], components: [] });
                    }
                })
            }
        } else {
            skipSong();
        }

        async function skipSong() {
            try {
                bot.distube.skip(message)
            } catch (err) {
                console.log(err);
            }
            const embed = new Discord.EmbedBuilder();
            embed.setColor(message.guild.members.me.displayHexColor);
            embed.setDescription(`⏭ Skipped the song!`)
            sendM(message, { embeds: [embed] })
        }


    }

}