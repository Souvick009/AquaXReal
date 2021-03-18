const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '>>';
//const Commands = require("./models/commands.js")
const fs = require('fs');
const token = process.env.token;
//const mongoose = require("mongoose");
//const dbUrl = "mongodb+srv://Real_Warrior:Windows_10@cluster0.onf6d.mongodb.net/test"
//mongoose.connect(dbUrl, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//})
//const talkedRecently = new Set();
// const cooldown = new Discord.Collection();
const DisTube = require('distube')

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;

bot.distube = new DisTube(bot, {
    searchSongs: false,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    youtubeDL: true,
    updateYouTubeDL: true,
    highWaterMark: 1024*1024*64,
    requestOptions: {
        headers: {
            cookie: "CONSENT=YES+IN.en-GB+20170910-09-0; VISITOR_INFO1_LIVE=WLPZi_oUxhQ; _gcl_au=1.1.1854864866.1613229250; PREF=volume=100&cvdm=grid&tz=Asia.Calcutta&al=en-GB&f5=30000&f6=40000000; HSID=AqgCzmypvT-mbfPL9; SSID=AZ8KQkbdECI8-tQaY; APISID=qRQ990KycP7KyGwG/AydSydPFdf2RiulD-; SAPISID=Sp5dF8Xl4HucNVwj/AChGLGfRLC6o6cXL4; __Secure-3PAPISID=Sp5dF8Xl4HucNVwj/AChGLGfRLC6o6cXL4; YSC=XiCKEEG3qVQ; LOGIN_INFO=AFmmF2swRAIgKDYDV63aI3xarfWziLm_99N-kaNuVsYMWEGYC_Cat8wCIAsRmnvRbLDujt4hlCegtEq1mzhiXvqDlnPYPTEHnqRp:QUQ3MjNmeXdTWVRTOTVvZzRjNmZleUM3Sk1veTU4WVZnYW1Tc19McU1ET0J6bkplUmR6aEZkSFotRlRRVVJJMVlBSko3UW5sUVVnZzgxc2haSks1TXh1VjBvMmZka2Rac05yS2ZTa2hRdnE2QzNRZ3YwNnhMaFRYRklMUWVWSDJnRHF2NEZYalNTM21PT1RqNzZEYzBLWkItRlhibzR4eXRnTFg0R2lzV0d0SlRURm5XQzdwZ2hxODhtdzNpbDEySWI1STMweVI1OHZB; SID=7gfzkkVrhBfD8evqeqURxNeXGDAyGhbcba1-94vclsP_Wu29oxDHWGkGTn0vkiPpmvJQeQ.; __Secure-3PSID=7gfzkkVrhBfD8evqeqURxNeXGDAyGhbcba1-94vclsP_Wu29eMJWnkRgqHg08WNkxqI0cg.; wide=1; SIDCC=AJi4QfHilcp5a7zbdf4Yw2Wff1EDpfoO5aeBRCQSfS9ZaaW211CntxeF7B69HzQtAxUlF6qDws_f; __Secure-3PSIDCC=AJi4QfFwU8zDYTuTjfwz5Hw3VAEiWhkfevfmBdkoFZJsCMt69RqK_vMtZVU8gwAzF7dtCOjyxc8",
            "x-youtube-identity-token": "",
        }
    },
    customFilters: {
        "clear": "dynaudnorm=f=200",
        "lowbass": "bass=g=6,dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
        "8D": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "normalizer": "dynaudnorm=f=200",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
    }
});

bot.distube
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
        queue.filter = "clear";
    })
    .on("playSong", (message, queue, song) => {
        const Playsong = new Discord.MessageEmbed();
        Playsong.setTitle("Playing :notes: " + song.name)
        Playsong.setURL(song.url)
        Playsong.addField("Duration", `\`${song.formattedDuration}\``)
        Playsong.addField("QueueStatus", status(queue))
        Playsong.setColor("#00ff00");
        Playsong.setThumbnail(song.thumbnail)
        Playsong.setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
        Playsong.setTimestamp();
        message.channel.send(Playsong)
    })
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ***${song.name}*** - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => {
        const PlayList = new Discord.MessageEmbed();
        PlayList.setTitle("Playling Playlist")
        PlayList.setDescription(`**Playlist:** \`${playlist.name}\`  -  \`${playlist.total_items} songs\` \n **Starting playing Song:** \`${song.name}\`  -  \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`);
        PlayList.setColor("#00ff00");
        PlayList.setFooter(bot.user.username, bot.user.displayAvatarURL());
        PlayList.setTimestamp();
        message.channel.send(PlayList)
    })
    .on("addList", (message, queue, playlist) => {
        const AddList = new Discord.MessageEmbed();
        AddList.setTitle("Added a Playlist!")
        AddList.setDescription(`Playlist: \`${playlist.name}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}`);
        AddList.setColor("#FFFF00");
        AddList.setFooter(bot.user.username, bot.user.displayAvatarURL());
        AddList.setTimestamp();
        message.channel.send(AddList)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const SearchResult = new Discord.MessageEmbed();
        SearchResult.setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        SearchResult.setColor("#FFFF00");
        SearchResult.setFooter(bot.user.username, bot.user.displayAvatarURL());
        SearchResult.setTimestamp();
        message.channel.send(SearchResult)
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
    .on("error", (message, err) => {
        const error1 = new Discord.MessageEmbed();
        error1.setTitle(`An error encountered:`);
        error1.setColor("#FF0000");
        error1.setDescription(err)
        error1.setFooter(bot.user.username, bot.user.displayAvatarURL());
        error1.setTimestamp();
        message.channel.send(error1)
    })
    .on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});
//let blacklisted = []

bot.on('ready', () => {
    console.log(`${bot.user.username} is Online!`);
    bot.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    })
    bot.user.setPresence({
        activity: {
            name: `on ${bot.guilds.cache.size} servers | >>help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
        .catch(console.error);
});
bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setPresence({
        activity: {
            name: `on ${bot.guilds.cache.size} servers | >>help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
        .catch(console.error);

});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setPresence({
        activity: {
            name: `on ${bot.guilds.cache.size} servers | >>help`,
            type: 'PLAYING'
        },
        status: 'idle'
    })
        .catch(console.error);
});
bot.on('message', async message => {
    if (message.channel.type === "dm") return;
    //  getdisabledcommand-
    //Commands.findOne({
    //    serverID: message.guild.id,
    //}, async (err, data) => {
    //    if (!data) {
    //        const newCommand = new Commands({
    //            serverID: message.guild.id,
    //       })
    //       await newCommand.save().catch(e => console.log(e));
    //    }

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = bot.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    // if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("❌ I don't have Embed Links Permission.");



    //console.log(data.commands.includes(command.name))
    //if (data.commands.includes(command.name)) return
    //if (talkedRecently.has(message.author.id)) {
    //    message.reply("You are on a cooldown of 5 Seconds.");
    //} else {
    command.run(bot, message, args);

    //    talkedRecently.add(message.author.id);
    //    setTimeout(() => {
    // Removes the user from the set after 5 seconds
    //   talkedRecently.delete(message.author.id);
    // }, 5000);
    // }
});




bot.login(token)