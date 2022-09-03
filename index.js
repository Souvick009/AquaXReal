const Discord = require('discord.js');
const Intents = Discord.Intents
const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
const fs = require('fs');
const token = "ODE1MTcxNjI3MDk1NTU2MTA2.GZ_mxI.GlRNTK6ZStGxoaGdR1Nl8kF9DqqwLWUBqt81z0";



const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;

bot.distube = new DisTube(bot, {
    searchSongs: 1,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
    youtubeDL: false,
    updateYouTubeDL: true,
    youtubeCookie: "VISITOR_INFO1_LIVE=tyIc2nrju6k; PREF=tz=Asia.Calcutta&f6=40000000; CONSENT=PENDING+660; YSC=ntlk9R2SXIE; SID=FgjzkguCcxP48fgn8Y7mJXgNzwDYECBq7rinbiEfk_8o2U8MIIE55tSiUly4kfk9q-JCYg.; __Secure-1PSID=FgjzkguCcxP48fgn8Y7mJXgNzwDYECBq7rinbiEfk_8o2U8MaxypQxo2aU1PLR_XiFdaOg.; __Secure-3PSID=FgjzkguCcxP48fgn8Y7mJXgNzwDYECBq7rinbiEfk_8o2U8Mfj0W0x1Jvy7uLmhu8jEqxw.; HSID=Am4Th-4Zm2SldcfFL; SSID=AjvQytqan0HDH27pk; APISID=jkM8aJyBcY4-E1G1/AEvhDyNdLrFL_0kfp; SAPISID=TriuzN6VICF7n3LS/Alt9JiF2s7CpCnL1p; __Secure-1PAPISID=TriuzN6VICF7n3LS/Alt9JiF2s7CpCnL1p; __Secure-3PAPISID=TriuzN6VICF7n3LS/Alt9JiF2s7CpCnL1p; LOGIN_INFO=AFmmF2swRAIgP2RnzI5T_yqC7DKnWtn9UAaQ6d1qsf_QFpuL0dC8jwQCIFN7IXYn0kpK0CAlrIagcmooBJSykv4Sh2LuYAIMUAqx:QUQ3MjNmeEM1blBfZ1dYN21jUlJiU0tDY0pYLWtTTzdoN294bVJyUDRnN1I2NUVmUXVVTHM5V2tZMTdKOU96bXlNYVNpQnBCalY1d1FRc2g3Y0piMDk2OXB6ZGVrci1UV0ItVGRtNXFWNFZCYkdVTzUzS29QbnhaU1lQNGJoZVdHdE9XZ1B1VngtbWpka1pyTUMyblpYMTY5UGNITGFkTFZR; CONSISTENCY=AGDxDeMdr6Ko2l3fszmI9XCylCe_bZHJVBKuz85p3PgqrDY0bdZ9ADJn4kiBeMOvgoQi9jgDMKPCS7U_0G_52AbHxH3Uy2v9DIjy2dPBHvhmLNaMpc3zlryceofBYvsZzYOvUCVWHHn11EwBxhPRdp_zogzgUnlW-TduzxC3Xpd0bYv32-4SGdLPm228F4uIqP3PZYWWwIuhIToM1_hlAFvfCJs; SIDCC=AJi4QfFEIKkAEF069SBQRpE79B0CRIIeOR14rMOfLa0SOiuZEvxIcjbXWOq5aKsjwjuyja_UEQ; __Secure-3PSIDCC=AJi4QfEt8Em-5bFeuMOGovBKObsDX8llYeXzp3Q6yRXHVZa_kMk9MwJy1P_PkNu1BGG7PlmhwS4",
    //"VISITOR_INFO1_LIVE=iXsfex80Su8; CONSENT=YES+IN.en-GB+201907; HSID=AZwdfuZ7tBeSv2raS; SSID=AvHu2TSA2dMD9vqxF; APISID=FwdjNOOzvO7NH90P/AYkfvvrTq-yb5UGKn; SAPISID=Zb3hc-deJxg6BfiZ/AWiHLSaKLzF7w7iBs; Secure-3PAPISID=Zb3hc-deJxg6BfiZ/AWiHLSaKLzF7w7iBs; PREF=volume=100&tz=Asia.Calcutta&al=en-GB&f5=30030&f4=4000000; SID=8weszRtqt2xf4Mb2LJ3f5eUjmCWvt5B5wTgdMMsDLL45Gxt_SiBLg2bhq0h94inR7XDNtQ.; Secure-3PSID=8weszRtqt2xf4Mb2LJ3f5eUjmCWvt5B5wTgdMMsDLL45Gxt_5tY0iEY3Deu-BfqmkXeJEQ.; YSC=9s8rdsbS5G0; LOGIN_INFO=AFmmF2swRQIgROwX9QR5zXC5W9EY2IZj4jeW7wrN9aNXUPTKGboUQW0CIQCF1dYZsgl46ifUGo5dsc2CSYTTZ487xubqHVvFXAhD0Q:QUQ3MjNmd1JibmdxVnNBLUFCZlR2RHlNeUJkWklvTXpWckNZa2dGNG1Id3VOVWxVcW1SdmJKRVhwZFRlT1ZzYkROejZFWVFiNkFFTGNIaEt3WmZVTmRxMG0zUjA5YjNteTg3aHZGZC1KR0p1UHdSRkNDN2VjeWNtQmdyTzNwRndQNXV2WXBZN0dMZ0JGRDFsTHNCVjN5eGprUTljXzF1Z0VsLWp3TkowY0dYOVZsaDJWZXRVaXFTb2picGdoN0lCdF9BYm9DVVN3Q2xW; SIDCC=AJi4QfHyUANh5IanSTU7LKMmau72Gw5oz-MKZR2M3PFuDZe0rGcmMroCP7MMt7vEVVAwXnYIkAM; __Secure-3PSIDCC=AJi4QfHuJoTBBl6U9cPQtF-N7DcO0XWFtkMNYO0npFWiqMiKqsuG4PFgG7FsTFZlVWNjpuYPJA",
    //AFmmF2swRQIhAKOMgPllz2YIOJAgKGXgBgo4q4BDTg3vuW2y4EYJ3rP0AiAHPMqBRWGrWVCZ0l653aoy1hhaX1hJWk8NoYQm-PFGdQ:QUQ3MjNmeldpal9qQXhtamwzNTZ1dVhiUUFnZ041UDVxUVE4bVRYV3NHMXlPWUwtWXZjZkcxdnZiNHBmVEFseUJfSVQ5MzVPU1dGZ3I4cVRJcVhRMnRTaXA0MzhoZURPbmlPTUhCRjZoa0JMS21wMlg0bmxQMWVJRlJmNkNzY1RtWVVoNEJZQkRQMEEyZmpWbEFKNDdfZHM1b1kzMFpnOFo5MzZEcWQwTnlsXzhuQ3ViQk00aXRMblNkN0lyRm5nSGV6b2NkMjV3V3dQ
    youtubeIdentityToken: "QUFFLUhqblRocS1UZjNLTW51MWtkaW5CZlQzc1hndXlFQXw\u003d",
    nsfw: true,
    emitAddListWhenCreatingQueue: false,
    emitAddSongWhenCreatingQueue: false,
    // requestOptions: {
    //     headers: {
    //         cookie: "CONSENT=YES+IN.en-GB+20170910-09-0; VISITOR_INFO1_LIVE=WLPZi_oUxhQ; _gcl_au=1.1.1854864866.1613229250; PREF=volume=100&cvdm=grid&tz=Asia.Calcutta&al=en-GB&f5=30000&f6=40000000; HSID=AqgCzmypvT-mbfPL9; SSID=AZ8KQkbdECI8-tQaY; APISID=qRQ990KycP7KyGwG/AydSydPFdf2RiulD-; SAPISID=Sp5dF8Xl4HucNVwj/AChGLGfRLC6o6cXL4; __Secure-3PAPISID=Sp5dF8Xl4HucNVwj/AChGLGfRLC6o6cXL4; YSC=XiCKEEG3qVQ; LOGIN_INFO=AFmmF2swRAIgKDYDV63aI3xarfWziLm_99N-kaNuVsYMWEGYC_Cat8wCIAsRmnvRbLDujt4hlCegtEq1mzhiXvqDlnPYPTEHnqRp:QUQ3MjNmeXdTWVRTOTVvZzRjNmZleUM3Sk1veTU4WVZnYW1Tc19McU1ET0J6bkplUmR6aEZkSFotRlRRVVJJMVlBSko3UW5sUVVnZzgxc2haSks1TXh1VjBvMmZka2Rac05yS2ZTa2hRdnE2QzNRZ3YwNnhMaFRYRklMUWVWSDJnRHF2NEZYalNTM21PT1RqNzZEYzBLWkItRlhibzR4eXRnTFg0R2lzV0d0SlRURm5XQzdwZ2hxODhtdzNpbDEySWI1STMweVI1OHZB; SID=7gfzkkVrhBfD8evqeqURxNeXGDAyGhbcba1-94vclsP_Wu29oxDHWGkGTn0vkiPpmvJQeQ.; __Secure-3PSID=7gfzkkVrhBfD8evqeqURxNeXGDAyGhbcba1-94vclsP_Wu29eMJWnkRgqHg08WNkxqI0cg.; wide=1; SIDCC=AJi4QfHilcp5a7zbdf4Yw2Wff1EDpfoO5aeBRCQSfS9ZaaW211CntxeF7B69HzQtAxUlF6qDws_f; __Secure-3PSIDCC=AJi4QfFwU8zDYTuTjfwz5Hw3VAEiWhkfevfmBdkoFZJsCMt69RqK_vMtZVU8gwAzF7dtCOjyxc8",
    //         "x-youtube-identity-token": "QUFFLUhqazdkR0hYM0kxS0N2U3hON24zNkpGbG94MDdBd3w\u003d",
    //     }
    // },
    customFilters: {
        "clear": "dynaudnorm=f=200",
        "lowbass": "bass=g=6,dynaudnorm=f=200",
        "bassboost": "bass=g=15,dynaudnorm=f=200",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
        "3d": "apulsator=hz=0.08,dynaudnorm=f=200",
        "nightcore": "aresample=48000,asetrate=48000*1.11",
        "3d>>": "apulsator=hz=1,dynaudnorm=f=200",
        "subboost": "asubboost,dynaudnorm=f=200",
        "8d": "haas,bass=g=6,dynaudnorm=f=200",
    },
    plugins: [new SpotifyPlugin()],
});

bot.distube
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 70;
        queue.setFilter("clear");
    })
    .on("searchNoResult", () => { })
    .on("searchInvalidAnswer", () => { })
    .on("searchDone", () => { })
    .on("playSong", (queue, song) => {
        const Playsong = new Discord.MessageEmbed();
        Playsong.setDescription(`Now playing [${song.name}](${song.url})`)
        // Playsong.setURL(song.url)
        return queue.textChannel.send({ embeds: [Playsong] })
        // const Playsong = new Discord.MessageEmbed();
        // Playsong.setTitle("Playing :notes: " + song.name)
        // Playsong.setURL(song.url)
        // Playsong.addField("Duration", `\`${song.formattedDuration}\``)
        // Playsong.addField("QueueStatus", status(queue))
        // Playsong.setColor("#00ff00");
        // Playsong.setThumbnail(song.thumbnail)
        // Playsong.setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
        // Playsong.setTimestamp();
        // message.channel.send(Playsong)
    })
    .on("addSong", (queue, song) => {
        const embed = new Discord.MessageEmbed()
        embed.setAuthor({ name: `Added To The Queue`, iconURL: bot.user.displayAvatarURL() })
        embed.setDescription(`[${song.name}](${song.url})`)
        embed.setThumbnail(song.thumbnail)
        embed.addField(`Channel`, song.uploader.name, true)
        embed.addField(`Duration`, song.formattedDuration, true)
        var position = queue.songs.length - 1
        embed.addField(`Position In The Queue`, position.toString(), true)
        queue.textChannel.send({ embeds: [embed] })

    })
    .on("addList", (queue, playlist) => {
        const AddList = new Discord.MessageEmbed();
        // console.log(playlist.properties)
        // if (playlist.playlist) {
        //     AddList.setAuthor({ text: "Added a Playlist!", iconURL:"https://drive.google.com/file/d/1j21_1a3lF-_MrtRGpXWiTu87EsfzhwF-/view?usp=sharing"})
        // } else {
        //     AddList.setAuthor({ text: "Added a Playlist!", iconURL:"https://drive.google.com/file/d/1M-CwKNmSJ-SO_pyiX1exesAAgngWsxw-/view?usp=sharing"})
        // }
        AddList.setTitle(`Added a Playlist!`)
        // console.log(playlist.songs)
        // console.log(playlist.playlist.songs.length)
        AddList.setDescription(`Playlist: \`${playlist.name}\`  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${playlist.user}`);
        AddList.setColor("#FFFF00");
        AddList.setThumbnail(playlist.thumbnail)
        AddList.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() });
        AddList.setTimestamp();
        queue.textChannel.send({ embeds: [AddList] })
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const SearchResult = new Discord.MessageEmbed();
        SearchResult.setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        SearchResult.setColor("#FFFF00");
        SearchResult.setFooter(bot.user.username, bot.user.displayAvatarURL());
        SearchResult.setTimestamp();
        message.channel.send({ embeds: [SearchResult] })
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => {
        const SearchCancel = new Discord.MessageEmbed();
        SearchCancel.setTitle(`Searching canceled`);
        SearchCancel.setColor("#FF0000");
        SearchCancel.setFooter(bot.user.username, bot.user.displayAvatarURL());
        SearchCancel.setTimestamp();
        message.channel.send(SearchCancel)
    })
    .on("error", (channel, err) => {
        if (err.errorCode == "UNAVAILABLE_VIDEO") {
            const embed = new Discord.MessageEmbed();
            embed.setColor("#FF0000")
            embed.setDescription("Unable to play the song")
            return channel.send({ embeds: [embed] })
        }
        const error1 = new Discord.MessageEmbed();
        error1.setTitle(`An error encountered:`);
        error1.setColor("#FF0000");
        error1.setDescription("Facing some errors to execute this command")
        error1.setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL() });
        error1.setTimestamp();
        channel.send({ embeds: [error1] })
        console.log(err)
    })
    .on("empty", queue => queue.textChannel.send("Channel is empty. Leaving the channel"));

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command", "event"].forEach(handler => {
    require(`./handler/${handler}`)(bot, Discord);
});

bot.login(token)
