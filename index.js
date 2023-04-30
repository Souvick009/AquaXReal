const Discord = require('discord.js');
// const Intents = Discord.Intents
const GatewayIntentBits = Discord.GatewayIntentBits
// - const { Client, Intents } = require('discord.js');
// + const { Client, GatewayIntentBits, Partials } = require('discord.js');

const bot = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates] })
// - const client = new Client({ intents: [Intents.FLAGS.GUILDS], partials: ['CHANNEL'] });
// + const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const bot = new Discord.Client({
//     intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.DIRECT_MESSAGES,
//         Intents.FLAGS.GUILD_VOICE_STATES
//     ]
// })
const fs = require('fs');
const token = "ODE1MTcxNjI3MDk1NTU2MTA2.GZ_mxI.GlRNTK6ZStGxoaGdR1Nl8kF9DqqwLWUBqt81z0";

const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
const { YtDlpPlugin } = require("@distube/yt-dlp")

bot.distube = new DisTube(bot, {
    plugins: [new YtDlpPlugin({ update: false }), new SpotifyPlugin()],
    directLink: true,
    searchSongs: 1,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
    youtubeCookie: "VISITOR_INFO1_LIVE=-kFUti0Lqi0; PREF=tz=Asia.Calcutta&f6=40000000&f7=100; DEVICE_INFO=ChxOekU0TURNek1qTTNNRE0xTXpRNU5EVXhNUT09ENmO7p8GGL/Ulp0G; GPS=1; YSC=X-SzGVHSA8o; CONSISTENCY=ACeCFAU29ycdkMV_s8JWJPNixXu35WFHhHqdcyaGUq5vN7TVOeagTKSTag4x4en3TJgez3mcx47z6WfxnxCenU0hU0ShsTfr4EHzTg91ZjNH5sAkmEXArSvErYK-ViH21N9Jbiwc4hhPS9L-y5YbFnQ; HSID=A0m_EONbaDIm3sEII; SSID=A6lbl4htow9qS0zE5; APISID=31vdCAx9ae1P1_GH/Abd-WDAdVKjiN7JKs; SAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; __Secure-1PAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; __Secure-3PAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; SID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINW9h1Y0F9thdb-2MLMvx5RQ.; __Secure-1PSID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINWNPT7jfw99H14Ng7bvf_yQ.; __Secure-3PSID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINaBkKJNivgsb1ZTfGSeFhFQ.; LOGIN_INFO=AFmmF2swRgIhAN0Myrjwdc1uoO7Fe0Hk-yQIsDoxtKd3sn-XwBaHFfC7AiEAy_JyTZCwyrKqW4LySdLCMYUFJ5ZYbLlFjBszytN03yA:QUQ3MjNmeUxTRS1pSkxsSmVHM1pXNkRRNFZMV29lOXk3LXhwU2FreDlEbTVuZ0x3RWtYTnNpbHEzSG1ldlRwa1czUEs1MU92bmZjbmFvdGl5Umo3RjJFOE1lSzJtRExRb2pXZ1BRQlZLUnFDakt6eGZaNm5IaHNuMWRGRmZyUXJYa3dPQTlRQ3lZRDRvbWtMYWhzeHNldzBuclBMRUVBRVd3; wide=1; SIDCC=AP8dLtwWO7o3QcYNTsUibmSAsCmElfIEdbeI9nImU2qlB0yjo08k6OTQp-BehB8IxmtArWJO; __Secure-1PSIDCC=AP8dLtx0xaT7HVvN5UnuxrwRFnBtMxXtAKlie_0l-T19oYbOaKh-L6C28IfNCYuB9dx8J-cYEA; __Secure-3PSIDCC=AP8dLtw9Wn-_8TZWidkyLdXH-Vc7nbddSYkMfiL0RpHj1UQIL2ULm88dnFi1i4SCmH50RPUqNg",
    youtubeIdentityToken: "QUFFLUhqazdkR0hYM0kxS0N2U3hON24zNkpGbG94MDdBd3w\u003d",
    nsfw: true,
    emitAddListWhenCreatingQueue: false,
    emitAddSongWhenCreatingQueue: false,
    // requestOptions: {
    //     headers: {
    //         Latest cookie : "GPS=1; YSC=MQlFEmUv-lk; VISITOR_INFO1_LIVE=AsY4dk7YPzc; PREF=tz=Asia.Calcutta&f6=40000000; CONSISTENCY=AGXVzq-L7u7l-Ek57zjFSZAzQ6l1yYYDnCCWG3So5hdmvdG33lKKbmz2HIShJ8s1YUcOM1xAAHNy3ZnSA0qWKZqgemD54dEatbnCr-jCYgZiApJcAZFLd_71JcywvHa5eVa5nUljGKstiRWGyv3P5YU; SID=OAh8UnvWeJ4vbcGAC1xgIzrOpZlNMk7h0Uq_IBfK6k5HOpAOssK5z477NlKJDK2wlvN9Fg.; __Secure-1PSID=OAh8UnvWeJ4vbcGAC1xgIzrOpZlNMk7h0Uq_IBfK6k5HOpAOjvoQV59zUsBRRFyWZnL6yg.; __Secure-3PSID=OAh8UnvWeJ4vbcGAC1xgIzrOpZlNMk7h0Uq_IBfK6k5HOpAOWmVDanNFqUl6Qcbx-Qlz2Q.; HSID=AuRmfAz11seMFQiIp; SSID=A6foUKqKmfV8OeTbH; APISID=1BMkYdfnWFvzYNhs/AOn_pzKqAYDcIGtg4; SAPISID=OLdpXnBPejOoTucB/AyEEJcQAPfTAmt0_F; __Secure-1PAPISID=OLdpXnBPejOoTucB/AyEEJcQAPfTAmt0_F; __Secure-3PAPISID=OLdpXnBPejOoTucB/AyEEJcQAPfTAmt0_F; LOGIN_INFO=AFmmF2swRgIhALk_sMtl0rkhwZYA5fqNZ9hP7Vtnp1AgcREljO6W9Ue_AiEA_yu0_JqXGnZMeXqOkunEI2AEUnS2-6t4zabO_gbpZmg:QUQ3MjNmeFptbHdjaG15aHdmNThOUDM2Z1FoUDdockhIMGJDc2tLdXBrVy12YXJZSVNKTzJVUjZaamhqVmR4cXJjbnNhNGJuelFpeV9tbGMyTHNTajNsV1Q4WEd3b3ZPWTRKemhTTmxZX180dWpZSTROalBabGZya2d3aGUxc3lQNXdpUGtraTBUWXpLMHp1SGFpUkxYZm1qVUZERl9XLVhB; SIDCC=AEf-XMSJrAu-IfwwiVwqEdfm6Fx1DANeqwKAe1D4WIOlMoApT7BJ7Zr-oBlexjAv2c7XHOYmxA; __Secure-1PSIDCC=AEf-XMS6UV_c0K4UKHKDt5ZRa_h9rjQheIWzYWTAgPsbHuxaoQT6Snjyn8HFGQkqpdqng7nGBw; __Secure-3PSIDCC=AEf-XMT0ySMo8dqjB2PpPFDatydi6WdtYLJ7kCTB189oZtevagiKO6Aesaq2_bTNAcV4s-eYFw"
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
        queue.filters.add("clear");
    })
    .on("searchNoResult", () => { })
    .on("searchInvalidAnswer", () => { })
    .on("searchDone", () => { })
    .on("playSong", (queue, song) => {
        const Playsong = new Discord.EmbedBuilder();
        Playsong.setDescription(`Now playing [${song.name}](${song.url})`)
        // Playsong.setURL(song.url)
        return queue.textChannel.send({ embeds: [Playsong] })
        // const Playsong = new Discord.EmbedBuilder();
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
        const embed = new Discord.EmbedBuilder()
        embed.setAuthor({ name: `Added To The Queue`, iconURL: bot.user.displayAvatarURL() })
        embed.setDescription(`[${song.name}](${song.url})`)
        embed.setThumbnail(song.thumbnail)
        var position = queue.songs.length - 1
        embed.addFields(
            { name: "Channel", value: song.uploader.name, inline: true },
            { name: "Duration", value: song.formattedDuration, inline: true },
            { name: "Position In The Queue", value: position.toString(), inline: true },
        )
        queue.textChannel.send({ embeds: [embed] })

    })
    .on("addList", (queue, playlist) => {
        const AddList = new Discord.EmbedBuilder();
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
        const SearchResult = new Discord.EmbedBuilder();
        SearchResult.setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        SearchResult.setColor("#FFFF00");
        SearchResult.setFooter(bot.user.username, bot.user.displayAvatarURL());
        SearchResult.setTimestamp();
        message.channel.send({ embeds: [SearchResult] })
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => {
        const SearchCancel = new Discord.EmbedBuilder();
        SearchCancel.setTitle(`Searching canceled`);
        SearchCancel.setColor("#FF0000");
        SearchCancel.setFooter(bot.user.username, bot.user.displayAvatarURL());
        SearchCancel.setTimestamp();
        message.channel.send(SearchCancel)
    })
    .on("error", (channel, err) => {
        if (err.errorCode == "UNAVAILABLE_VIDEO") {
            const embed = new Discord.EmbedBuilder();
            embed.setColor("#FF0000")
            embed.setDescription("Unable to play the song")
            return channel.send({ embeds: [embed] })
        }
        const error1 = new Discord.EmbedBuilder();
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
