const Discord = require('discord.js');
const bot = new Discord.Client();
var prefix = '';
//const Commands = require("./models/commands.js")
const fs = require('fs');
const mongoose = require("mongoose")
const token = process.env.token;
const dbUrl = "mongodb+srv://shander:shander123456@cluster0.9voow.mongodb.net/test"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var reply = true;
const Prefix = require("./models/prefix")
//const mongoose = require("mongoose");
//const dbUrl = "mongodb+srv://Real_Warrior:Windows_10@cluster0.onf6d.mongodb.net/test"
//mongoose.connect(dbUrl, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//})
//const talkedRecently = new Set();
// const cooldown = new Discord.Collection();
const DisTube = require('distube');
const { getTracks, getPreview } = require("spotify-url-info");

// Queue status template
const status = (queue) => `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filter || "Off"}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;

bot.distube = new DisTube(bot, {
    searchSongs: false,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
    youtubeDL: true,
    updateYouTubeDL: true,
    highWaterMark: 1024 * 1024 * 64,
    youtubeCookie: "CONSENT=YES+IN.en-GB+20170910-09-0; VISITOR_INFO1_LIVE=WLPZi_oUxhQ; _gcl_au=1.1.1854864866.1613229250; PREF=volume=100&cvdm=grid&tz=Asia.Calcutta&al=en-GB&f5=30000&f6=40000000; LOGIN_INFO=AFmmF2swRgIhAIRYKxjfO2eiWUHsWFeDzi16lGBRXiL3jVKHOfDldgWiAiEAri-Nz96JvOOCJXKAtDL5fAFl75c-7AzotnjCBAh9uyA:QUQ3MjNmd25KVVlDM2o1SUFVVk9fWkdXMmw5TWsySW9lMXVwM3I0MVpFRVZNeGhfV080cENIVVhESlRCTGJNUVpzZmhRLU1ObVdNQk45c0R2SFR3SWY4Ti02cjFEMHk1NFVvWWFBMEVGMThGWVVZZV84bzZwRHlPc1dIaUZRaElRNk1vbFVjVlpJT2FNU3pVc0FsWGt2Sm9LQUdoVERVem9ZcmxLQU1MTkdZNG8wQTlsVHZ1RTB3; SID=9QfzkpFLIzwalUsELiBccyk7tYedXOaGazAIlZ7VAFWNvN7eWjVZv5jzkcS3qk4zUKM12g.; __Secure-3PSID=9QfzkpFLIzwalUsELiBccyk7tYedXOaGazAIlZ7VAFWNvN7e3LbCD9JnrNDz-qDw_Q6Vfg.; HSID=AdcZeIWuQ_k4bQnQE; SSID=ALBTYPByfTzdmiw1I; APISID=ucqQ7evXgxrDBcTJ/AAPXa7tHmB4G_De-t; SAPISID=FeUnBhsUFstZftum/AnhDPYkp4G-Z5ufrb; __Secure-3PAPISID=FeUnBhsUFstZftum/AnhDPYkp4G-Z5ufrb; YSC=dLcLbNmQaxs; SIDCC=AJi4QfFfgX8mqsLVCutDxm3NtgaP721EgmbCSkpIZt89mwzuTrViFEggolkIT81YGarwIiA6Zg; __Secure-3PSIDCC=AJi4QfFFZNeWjZXIoR-pgWPWW724fcH7gYco_tgj41DhHPMbvBUBQ8QBs6A9pnEqFghRhU62DA",
    //"VISITOR_INFO1_LIVE=iXsfex80Su8; CONSENT=YES+IN.en-GB+201907; HSID=AZwdfuZ7tBeSv2raS; SSID=AvHu2TSA2dMD9vqxF; APISID=FwdjNOOzvO7NH90P/AYkfvvrTq-yb5UGKn; SAPISID=Zb3hc-deJxg6BfiZ/AWiHLSaKLzF7w7iBs; Secure-3PAPISID=Zb3hc-deJxg6BfiZ/AWiHLSaKLzF7w7iBs; PREF=volume=100&tz=Asia.Calcutta&al=en-GB&f5=30030&f4=4000000; SID=8weszRtqt2xf4Mb2LJ3f5eUjmCWvt5B5wTgdMMsDLL45Gxt_SiBLg2bhq0h94inR7XDNtQ.; Secure-3PSID=8weszRtqt2xf4Mb2LJ3f5eUjmCWvt5B5wTgdMMsDLL45Gxt_5tY0iEY3Deu-BfqmkXeJEQ.; YSC=9s8rdsbS5G0; LOGIN_INFO=AFmmF2swRQIgROwX9QR5zXC5W9EY2IZj4jeW7wrN9aNXUPTKGboUQW0CIQCF1dYZsgl46ifUGo5dsc2CSYTTZ487xubqHVvFXAhD0Q:QUQ3MjNmd1JibmdxVnNBLUFCZlR2RHlNeUJkWklvTXpWckNZa2dGNG1Id3VOVWxVcW1SdmJKRVhwZFRlT1ZzYkROejZFWVFiNkFFTGNIaEt3WmZVTmRxMG0zUjA5YjNteTg3aHZGZC1KR0p1UHdSRkNDN2VjeWNtQmdyTzNwRndQNXV2WXBZN0dMZ0JGRDFsTHNCVjN5eGprUTljXzF1Z0VsLWp3TkowY0dYOVZsaDJWZXRVaXFTb2picGdoN0lCdF9BYm9DVVN3Q2xW; SIDCC=AJi4QfHyUANh5IanSTU7LKMmau72Gw5oz-MKZR2M3PFuDZe0rGcmMroCP7MMt7vEVVAwXnYIkAM; __Secure-3PSIDCC=AJi4QfHuJoTBBl6U9cPQtF-N7DcO0XWFtkMNYO0npFWiqMiKqsuG4PFgG7FsTFZlVWNjpuYPJA",
    //AFmmF2swRQIhAKOMgPllz2YIOJAgKGXgBgo4q4BDTg3vuW2y4EYJ3rP0AiAHPMqBRWGrWVCZ0l653aoy1hhaX1hJWk8NoYQm-PFGdQ:QUQ3MjNmeldpal9qQXhtamwzNTZ1dVhiUUFnZ041UDVxUVE4bVRYV3NHMXlPWUwtWXZjZkcxdnZiNHBmVEFseUJfSVQ5MzVPU1dGZ3I4cVRJcVhRMnRTaXA0MzhoZURPbmlPTUhCRjZoa0JMS21wMlg0bmxQMWVJRlJmNkNzY1RtWVVoNEJZQkRQMEEyZmpWbEFKNDdfZHM1b1kzMFpnOFo5MzZEcWQwTnlsXzhuQ3ViQk00aXRMblNkN0lyRm5nSGV6b2NkMjV3V3dQ
    youtubeIdentityToken: "QUFFLUhqblRocS1UZjNLTW51MWtkaW5CZlQzc1hndXlFQXw\u003d",
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
        "3D": "apulsator=hz=0.08,dynaudnorm=f=200",
        "nightcore": "aresample=48000,asetrate=48000*1.11",
        "3D>>": "apulsator=hz=1,dynaudnorm=f=200",
        "subboost": "asubboost,dynaudnorm=f=200",
        "8D": "haas,bass=g=6,dynaudnorm=f=200",
        "mcompand": "mcompand,dynaudnorm=f=200"
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
    .on("addSong", (message, queue, song) => {


        message.channel.send(
            `Added ***${song.name}*** - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )

    })
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
        error1.setDescription("Facing some errors to execute this command")
        error1.setFooter(bot.user.username, bot.user.displayAvatarURL());
        error1.setTimestamp();
        message.channel.send(error1)
        console.log(err)
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
    const list = await Prefix.findOne({
        serverId: message.guild.id
    }, async (err, server) => {
        if (err) console.log(err);
        if (!server) {
            prefix = ">>"
        } else if (server) {
            prefix = server.prefix
        }
        if (message.mentions.has(bot.user.id)) {
            message.channel.send(`**Hello! My prefix for this server is** \`${prefix}\``);
        };
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        // Get the command
        let command = bot.commands.get(cmd);
        // If none is found, try to find it by alias
        if (!command) command = bot.commands.get(bot.aliases.get(cmd));

        if (!command) return
        // if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("❌ I don't have Embed Links Permission.");

        command.run(bot, message, args);
    })
    //console.log(data.commands.includes(command.name))
    //if (data.commands.includes(command.name)) return
    //if (talkedRecently.has(message.author.id)) {
    //    message.reply("You are on a cooldown of 5 Seconds.");
    //} else {


    //    talkedRecently.add(message.author.id);
    //    setTimeout(() => {
    // Removes the user from the set after 5 seconds
    //   talkedRecently.delete(message.author.id);
    // }, 5000);
    // }
});




bot.login(token)