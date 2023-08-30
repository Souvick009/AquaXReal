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
const token = "Njk4OTA1NDA1MDYxMDcwOTA5.GQfFsm.d8J-RREEsuqgP4hafyRf4JSUAGLYG7Xolqo4Gc";
//"ODE1MTcxNjI3MDk1NTU2MTA2.GltDVx.W2gvtAy7FaxpfxoJ0RDmv42MPBfOFcboPo7Fwo"
module.exports = { token: token };
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { DeezerPlugin } = require("@distube/deezer");
const { SoundCloudPlugin } = require("@distube/soundcloud");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
const { YtDlpPlugin } = require("@distube/yt-dlp")

bot.distube = new DisTube(bot, {
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
    youtubeCookie: "VISITOR_INFO1_LIVE=4J2KGuWcH2Q; HSID=ADRAfaiTHkXfmjvTM; SSID=AgEul6FL5TQSa_TXk; APISID=8j1tge2V8zSfa9FC/AvXq34xGFPx2qspUz; SAPISID=BE6EfDaKmSHjqM7w/AbXaqGAYgLxDmxiuP; __Secure-1PAPISID=BE6EfDaKmSHjqM7w/AbXaqGAYgLxDmxiuP; __Secure-3PAPISID=BE6EfDaKmSHjqM7w/AbXaqGAYgLxDmxiuP; PREF=f4=4000000&tz=Asia.Calcutta&f7=150&f6=40000000&f5=30000; SID=Ygj-4Ov2DN8_gZylHH-ZtC1f7pjfTytoWc9XUt5_NBl9Td8BrL1TPLaWF4YHfwWcnpUsAA.; __Secure-1PSID=Ygj-4Ov2DN8_gZylHH-ZtC1f7pjfTytoWc9XUt5_NBl9Td8BRuI_hzbrDa9ekcSMfFEBrg.; __Secure-3PSID=Ygj-4Ov2DN8_gZylHH-ZtC1f7pjfTytoWc9XUt5_NBl9Td8BA9T03fjUCQHKmVDK2QzHyA.; YSC=CaCY73asiBI; LOGIN_INFO=AFmmF2swRgIhAKHXjeoxPXYZMwMK9194TPvXPcdAEN34kXE0tqdHP8SWAiEAsmyLo6PsHuMr5knVq141X2-cm7Sc6D6Rpj-pknpAavY:QUQ3MjNmeDdzbXFfYXd3dmx2OUVwV3VsbTlxanF3bERKR1llOWNJUGVTbUwxN1RhYS1NVU55SXM5NzBEdk03ZjRRUXUtdU1RQzF1X293YWpxUHZwTUxvN1M3aDlQY1lkQzVCNkpjUVRFV0R0b0p0MmU1ZDlaNk1Pa1duakQyYUlHa2NRV3ZZckd6bk55TkljWWtJQW9oQjRiZXJRU3lFYkZ3; SIDCC=APoG2W-m8h9b_RLbdgt5huPHSy4WHaN7ekoGY7oOJDG1O1xF-TDrgfQUBU4J946fz2ABitCwDk8; __Secure-1PSIDCC=APoG2W-2mqEDqyW2TYRkpHeolYF8hWhz32tdbJ1Ia11K5i3znKrnBy8M39acMjLqJgFir5uM0y0; __Secure-3PSIDCC=APoG2W-SgfYtOtfPV3NXbXsKbIkWLnuy5N4VvVDgBx3V5gMeNm26QNzRbn8YAe0DXlRwnST3S5c",
    youtubeIdentityToken: "QUFFLUhqazdkR0hYM0kxS0N2U3hON24zNkpGbG94MDdBd3w\u003d",
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
