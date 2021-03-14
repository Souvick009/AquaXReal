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
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

bot.distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => {
        const Playsong = new Discord.MessageEmbed();
        Playsong.setTitle(`:notes: Playing New Song!`);
        Playsong.setDescription(`**Song:** \`${song.name}\`  -  \`${song.formattedDuration}\` \n\n**Requested by:** ${song.user}\n${status(queue)}`)
        Playsong.setColor("#00ff00");
        Playsong.setFooter(bot.user.username, bot.user.displayAvatarURL());
        Playsong.setTimestamp();
        message.channel.send(Playsong)
    })
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ***${song.name}*** - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
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
            name: `on ${bot.guilds.cache.size} servers | !help`,
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
            name: `on ${bot.guilds.cache.size} servers | !help`,
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
            name: `on ${bot.guilds.cache.size} servers | !help`,
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