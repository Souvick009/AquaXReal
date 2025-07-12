require("./logger");
require("dotenv").config();

const Discord = require('discord.js');
const { VibeSync } = require("vibesync")
// const Intents = Discord.Intents
const GatewayIntentBits = Discord.GatewayIntentBits
// - const { Client, Intents } = require('discord.js');
// + const { Client, GatewayIntentBits, Partials } = require('discord.js');

const bot = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
bot.VibeSync = new VibeSync(bot);

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
const token = process.env.DISCORD_TOKEN;
module.exports = { token: token, botID: "815171627095556106" };
const { DisTube, StreamType } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
// const { DeezerPlugin } = require("@distube/deezer");
const { SoundCloudPlugin } = require("@distube/soundcloud");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;
const { YtDlpPlugin } = require("@distube/yt-dlp")
const { YouTubePlugin } = require("@distube/youtube")
const { DirectLinkPlugin } = require("@distube/direct-link");

bot.distube = new DisTube(bot, {
    plugins: [
        new DirectLinkPlugin(),
        new SpotifyPlugin({
            api: {
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
                topTracksCountry: "IN"
            }
        }),
        new YouTubePlugin({
            cookies: process.env.YOUTUBE_COOKIE
        }),
        new YtDlpPlugin({ update: true }),
        // new SoundCloudPlugin(),
    ],

    emitNewSongOnly: true,
    nsfw: true,
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    customFilters: {
        "clear": "dynaudnorm=f=250",
        "lowbass": "bass=g=4,dynaudnorm=f=200",
        "bassboost": "bass=g=10,dynaudnorm=f=200",
        "purebass": "bass=g=14,dynaudnorm=f=200,asubboost",
        "3d": "apulsator=hz=0.08,dynaudnorm=f=200",
        "nightcore": "aresample=48000,asetrate=48000*1.05,atempo=1.02",
        "vaporwave": "aresample=48000,asetrate=48000*0.9,atempo=0.85",
        "surround": "surround, dynaudnorm=f=200",
        "3d>>": "apulsator=hz=1,dynaudnorm=f=200",
        "subboost": "asubboost,dynaudnorm=f=200",
        "8d": "haas,bass=g=4,dynaudnorm=f=200",
    },
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bot.distube
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 70;
        queue._shouldApplyClearFilter = true;
    })
    .on("searchNoResult", () => { })
    .on("searchInvalidAnswer", () => { })
    .on("searchDone", () => { })

    .on("playSong", async (queue, song) => {
        if (queue._shouldApplyClearFilter) {
            try {
                queue.filters.add("clear");
                queue._shouldApplyClearFilter = false; // Prevent reapplying
            } catch (err) {
                console.error("Error applying clear filter:", err);
            }
        }

        const maxLength = 36
        const songName = `🎵 ${queue.songs[0]?.name}`
        const safeStatus = songName.length > maxLength ? songName.slice(0, maxLength - 4) + "..." : songName
        bot.distube._currentSongStatus = safeStatus
        bot.VibeSync.setVoiceStatus(queue.clientMember.voice.channelId, safeStatus)

        const Playsong = new Discord.EmbedBuilder();
        Playsong.setDescription(`Now playing [${song.name}](${song.url})`)
        //Playsong.setFooter({ text: `Requested by: ${song.member.user.username}`, iconURL: song.member.user.displayAvatarURL() })
        queue.textChannel.send({ embeds: [Playsong] })
            .then(msg => { song._msg = msg })
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

        const before = queue.songs.length;

        // Filter songs with missing name or duration
        queue.songs = queue.songs.filter(song => song.name && song.duration > 0);

        const after = queue.songs.length;
        if (after < before) {
            queue.textChannel?.send({
                content: `⚠️ Skipped ${before - after} invalid songs from the playlist.`
            });
        }

        const AddList = new Discord.EmbedBuilder();
        // console.log(playlist.properties)
        // if (playlist.playlist) {
        //     AddList.setAuthor({ text: "Added a Playlist!", iconURL:"https://drive.google.com/file/d/1j21_1a3lF-_MrtRGpXWiTu87EsfzhwF-/view?usp=sharing"})
        // } else {
        //     AddList.setAuthor({ text: "Added a Playlist!", iconURL:"https://drive.google.com/file/d/1M-CwKNmSJ-SO_pyiX1exesAAgngWsxw-/view?usp=sharing"})
        // }
        AddList.setTitle(`Added a Playlist!`)
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
        SearchCancel.setDescription(`Searching canceled`);
        SearchCancel.setColor("#FF0000");
        message.channel.send(SearchCancel)
    })
    .on("error", (err, queue, song) => {
        console.log(err)
        if (err.errorCode == "UNAVAILABLE_VIDEO") {
            const embed = new Discord.EmbedBuilder();
            embed.setColor("#FF0000")
            embed.setDescription("Unable to play the song\nERROR : UNAVAILABLE_VIDEO")
            return channel.send({ embeds: [embed] })
        }
        const error1 = new Discord.EmbedBuilder();
        error1.setColor("#FF0000");
        error1.setDescription(`An error encountered: ` + err.message)
        queue.textChannel?.send({ embeds: [error1] })
        console.log(err)
    })
    .on("empty", queue => queue.textChannel.send("Channel is empty. Leaving the channel"))
    .on("finishSong", (queue, song) => {
        if (song._msg) {
            song._msg.delete().catch(err => console.error("Failed to delete the message: " + err))
        }
    })
    .on("finish", (queue) => {

        bot.distube._currentSongStatus = ""
        const queueFinished = new Discord.EmbedBuilder();
        queueFinished.setColor("#D32F2F");
        queueFinished.setDescription("There are no more tracks in the queue.\nUse `\\play` or >>play to add more songs in the queue.")
        //Playsong.setFooter({ text: `Requested by: ${song.member.user.username}`, iconURL: song.member.user.displayAvatarURL() })
        queue.textChannel.send({ embeds: [queueFinished] })

        bot.VibeSync.setVoiceStatus(queue.clientMember.voice.channelId, "")
    });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command", "event"].forEach(handler => {
    require(`./handler/${handler}`)(bot, Discord);
});

bot.login(token)