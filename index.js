const Discord = require('discord.js');
// const Intents = Discord.Intents
const GatewayIntentBits = Discord.GatewayIntentBits
// - const { Client, Intents } = require('discord.js');
// + const { Client, GatewayIntentBits, Partials } = require('discord.js');

const bot = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
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
const token = "ODE1MTcxNjI3MDk1NTU2MTA2.GltDVx.W2gvtAy7FaxpfxoJ0RDmv42MPBfOFcboPo7Fwo";
//"Njk4OTA1NDA1MDYxMDcwOTA5.GQfFsm.d8J-RREEsuqgP4hafyRf4JSUAGLYG7Xolqo4Gc"
module.exports = { token: token };
const { DisTube, StreamType } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { DeezerPlugin } = require("@distube/deezer");
const { SoundCloudPlugin } = require("@distube/soundcloud");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
const { YtDlpPlugin } = require("@distube/yt-dlp")

bot.distube = new DisTube(bot, {
    streamType: StreamType.RAW,
    plugins: [new YtDlpPlugin({ update: false }), new SpotifyPlugin({
        emitEventsAfterFetching: true,
        songsPerRequest: 3,
        requestDelay: 10000,
    }), new DeezerPlugin(), new SoundCloudPlugin()],
    directLink: true,
    searchSongs: 1,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
    youtubeCookie: [
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699563,
            "hostOnly": false,
            "httpOnly": false,
            "name": "__Secure-1PAPISID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "lLSwdehm1OpRe_IA/AKe_d_GjGtS7-6RZx",
            "id": 1
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699449,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-1PSID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "cAjzkgalBaJSSS4_M9DaRSkkBEdJJErPqlbqhPKwJLNbZC29NvxL8i3SajbnOIpz_3SXQQ.",
            "id": 2
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1729272005.34942,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-1PSIDCC",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "ACA-OxPnIlL1aCOSxYuIGvOY4NXFCvwMcE66NU0w9MqsVS5DSe-hYomxc1z09aTXdbUZdcSWuUI",
            "id": 3
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1729271881.730914,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-1PSIDTS",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "sidts-CjIB3e41hd0LMZoSLisGtWZdInGxs7jckn056adSMl3EkGq8ACFx8c4_d0axWMDyhPNqqhAA",
            "id": 4
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699582,
            "hostOnly": false,
            "httpOnly": false,
            "name": "__Secure-3PAPISID",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "lLSwdehm1OpRe_IA/AKe_d_GjGtS7-6RZx",
            "id": 5
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.69947,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-3PSID",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "cAjzkgalBaJSSS4_M9DaRSkkBEdJJErPqlbqhPKwJLNbZC29mUIXIbTjZp7kd5YS0qPEBw.",
            "id": 6
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1729272005.349457,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-3PSIDCC",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "ACA-OxMHJ6QF7wrIRYmCIS0WiTaUF0FEy4nsoxb2JO9kUYGtjjMM3V52jfjPN8gA1Rzgd3FaQn4",
            "id": 7
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1729271881.731096,
            "hostOnly": false,
            "httpOnly": true,
            "name": "__Secure-3PSIDTS",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "sidts-CjIB3e41hd0LMZoSLisGtWZdInGxs7jckn056adSMl3EkGq8ACFx8c4_d0axWMDyhPNqqhAA",
            "id": 8
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699525,
            "hostOnly": false,
            "httpOnly": false,
            "name": "APISID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "i_Ia1dzOe3w35PYh/AtBIayKu3AF7qDJAn",
            "id": 9
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699488,
            "hostOnly": false,
            "httpOnly": true,
            "name": "HSID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "AAapc0YkURQf_46YF",
            "id": 10
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732294678.752276,
            "hostOnly": false,
            "httpOnly": true,
            "name": "LOGIN_INFO",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "AFmmF2swRQIgcTi8pe55aQ3m3ngHJKDXf4WXIWXToHwB4zNXdGoNi0oCIQCQgkfeMnsHuOL8yD3MFn0FD-Cg27aB9agJY3OoKn6nQg:QUQ3MjNmeV94M2NUZGpXN1VIaWFiYjNjeDRCRm5scUtWWGdkSW1hZEpsMm1DXzlzX09xRm5jYUV5VXFQc3VTanpRZHp5UHJPY0o3eHVWb2ZtVm95NFBFLWxhN1pNWl9BSVJyMU94aWhkRmtld2htZkh4THA1ZWU5M01XQzRuVjdxaDdyNk1ZOEdVRnV2U0xYeWJGbGw4d0J4dWt3RlR3bDl3",
            "id": 11
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732295514.769386,
            "hostOnly": false,
            "httpOnly": false,
            "name": "PREF",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "f4=4000000&f6=40000000&tz=Asia.Calcutta&f5=30000",
            "id": 12
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699544,
            "hostOnly": false,
            "httpOnly": false,
            "name": "SAPISID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "lLSwdehm1OpRe_IA/AKe_d_GjGtS7-6RZx",
            "id": 13
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699296,
            "hostOnly": false,
            "httpOnly": false,
            "name": "SID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "cAjzkgalBaJSSS4_M9DaRSkkBEdJJErPqlbqhPKwJLNbZC29YST8vJHBSJ8CtrYepM7WlQ.",
            "id": 14
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1729272005.34924,
            "hostOnly": false,
            "httpOnly": false,
            "name": "SIDCC",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "ACA-OxPqQImWJ0JkvutHB5_TqNd9dphXCuPGLRfGJ1oHG5xGRQEqt1nuiTZtVpeJcrayS4Kiig",
            "id": 15
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1732291862.699508,
            "hostOnly": false,
            "httpOnly": true,
            "name": "SSID",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "AY6hy0lsJmRhTVjxF",
            "id": 16
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1697736006,
            "hostOnly": false,
            "httpOnly": false,
            "name": "ST-1b",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "disableCache=true&itct=CBEQsV4iEwiE3-TQzYKCAxXh6nMBHYPtBpQ%3D&csn=MC4yOTU5MDQ5Mzg2OTg5MTY3Ng..&endpoint=%7B%22clickTrackingParams%22%3A%22CBEQsV4iEwiE3-TQzYKCAxXh6nMBHYPtBpQ%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2F%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_BROWSE%22%2C%22rootVe%22%3A3854%2C%22apiUrl%22%3A%22%2Fyoutubei%2Fv1%2Fbrowse%22%7D%7D%2C%22browseEndpoint%22%3A%7B%22browseId%22%3A%22FEwhat_to_watch%22%7D%7D",
            "id": 17
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1712666171.752478,
            "hostOnly": false,
            "httpOnly": true,
            "name": "VISITOR_INFO1_LIVE",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "5zF5RsK_YCs",
            "id": 18
        },
        {
            "domain": ".youtube.com",
            "expirationDate": 1712668187.364227,
            "hostOnly": false,
            "httpOnly": true,
            "name": "VISITOR_PRIVACY_METADATA",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "CgJJThICGgA%3D",
            "id": 19
        },
        {
            "domain": ".youtube.com",
            "hostOnly": false,
            "httpOnly": true,
            "name": "YSC",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": true,
            "storeId": "0",
            "value": "IyoohIyXKnc",
            "id": 20
        }
    ],
    nsfw: true,
    emitAddListWhenCreatingQueue: false,
    emitAddSongWhenCreatingQueue: false,
    // requestOptions: {
    //     headers: {
    //         Latest cookie : "VISITOR_INFO1_LIVE=-kFUti0Lqi0; PREF=tz=Asia.Calcutta&f6=40000000&f7=100; DEVICE_INFO=ChxOekU0TURNek1qTTNNRE0xTXpRNU5EVXhNUT09ENmO7p8GGL/Ulp0G; GPS=1; YSC=X-SzGVHSA8o; CONSISTENCY=ACeCFAU29ycdkMV_s8JWJPNixXu35WFHhHqdcyaGUq5vN7TVOeagTKSTag4x4en3TJgez3mcx47z6WfxnxCenU0hU0ShsTfr4EHzTg91ZjNH5sAkmEXArSvErYK-ViH21N9Jbiwc4hhPS9L-y5YbFnQ; HSID=A0m_EONbaDIm3sEII; SSID=A6lbl4htow9qS0zE5; APISID=31vdCAx9ae1P1_GH/Abd-WDAdVKjiN7JKs; SAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; __Secure-1PAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; __Secure-3PAPISID=ibuMZI_FaWoH1W8b/APzkJwIVLPQsmPuEc; SID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINW9h1Y0F9thdb-2MLMvx5RQ.; __Secure-1PSID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINWNPT7jfw99H14Ng7bvf_yQ.; __Secure-3PSID=WAh8UqL5kO0mS-mEnOR60kRLpIDyGiMCGfiSQjmfXs9qzHINaBkKJNivgsb1ZTfGSeFhFQ.; LOGIN_INFO=AFmmF2swRgIhAN0Myrjwdc1uoO7Fe0Hk-yQIsDoxtKd3sn-XwBaHFfC7AiEAy_JyTZCwyrKqW4LySdLCMYUFJ5ZYbLlFjBszytN03yA:QUQ3MjNmeUxTRS1pSkxsSmVHM1pXNkRRNFZMV29lOXk3LXhwU2FreDlEbTVuZ0x3RWtYTnNpbHEzSG1ldlRwa1czUEs1MU92bmZjbmFvdGl5Umo3RjJFOE1lSzJtRExRb2pXZ1BRQlZLUnFDakt6eGZaNm5IaHNuMWRGRmZyUXJYa3dPQTlRQ3lZRDRvbWtMYWhzeHNldzBuclBMRUVBRVd3; wide=1; SIDCC=AP8dLtwWO7o3QcYNTsUibmSAsCmElfIEdbeI9nImU2qlB0yjo08k6OTQp-BehB8IxmtArWJO; __Secure-1PSIDCC=AP8dLtx0xaT7HVvN5UnuxrwRFnBtMxXtAKlie_0l-T19oYbOaKh-L6C28IfNCYuB9dx8J-cYEA; __Secure-3PSIDCC=AP8dLtw9Wn-_8TZWidkyLdXH-Vc7nbddSYkMfiL0RpHj1UQIL2ULm88dnFi1i4SCmH50RPUqNg",
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
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bot.distube
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 70;
        queue.filters.add("clear");
    })
    .on("searchNoResult", () => { })
    .on("searchInvalidAnswer", () => { })
    .on("searchDone", () => { })

    .on("playSong", async (queue, song) => {
        const Playsong = new Discord.EmbedBuilder();
        Playsong.setDescription(`Now playing [${song.name}](${song.url})`)
        //Playsong.setFooter({ text: `Requested by: ${song.member.user.username}`, iconURL: song.member.user.displayAvatarURL() })
        queue.textChannel.send({ embeds: [Playsong] })
    })
    .on("addSong", (queue, song) => {
        const embed = new Discord.EmbedBuilder()
        embed.setAuthor({ name: `Added To The Queue`, iconURL: bot.user.displayAvatarURL() })
        //embed.setFooter({ text: `Requested by: ${song.member.user.username}`, iconURL: song.member.user.displayAvatarURL() })
        embed.setDescription(`[${song.name}](${song.url})`)
        embed.setThumbnail(song.thumbnail)
        var position = queue.songs.length - 1
        embed.addFields(
            { name: "Channel", value: song.uploader.name, inline: true },
            { name: "Duration", value: song.formattedDuration, inline: true },
            { name: "Position In The Queue", value: position.toString(), inline: true },
        )
        return queue.textChannel.send({ embeds: [embed] })

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
        // let i = 0;
        // const SearchResult = new Discord.EmbedBuilder();
        // SearchResult.setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        // SearchResult.setColor("#FFFF00");
        // SearchResult.setFooter(bot.user.username, bot.user.displayAvatarURL());
        // SearchResult.setTimestamp();
        // message.channel.send({ embeds: [SearchResult] })
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
        console.log(err)
        if (err.errorCode == "UNAVAILABLE_VIDEO") {
            const embed = new Discord.EmbedBuilder();
            embed.setColor("#FF0000")
            embed.setDescription("Unable to play the song\nERROR : UNAVAILABLE_VIDEO")
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
