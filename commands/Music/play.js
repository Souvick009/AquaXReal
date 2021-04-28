const Discord = require("discord.js");
const prefix = '>>';
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { getTracks, getPreview } = require("spotify-url-info");
var SpotifyWebApi = require("spotify-web-api-node")
var spotifyApi = new SpotifyWebApi({
    clientId: '3a80dcbbc9ed40fa98dbbdcf09c4e1c3',
    clientSecret: 'ba8021e08dbb4251817fcec09b8b175b',
    redirectUri: 'http://www.example.com/callback/'
});

module.exports = {
    name: "play",
    aliases: ['p'],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        const vc = new Discord.MessageEmbed()
        if (!voice_channel) {
            vc.setColor("#FF0000")
            vc.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL());
            vc.setTitle(`❌ ERROR | Please join a voice channel first`)
            return message.channel.send(vc)
        };

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing connect premission');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing speak permission');

        let channel = message.member.voice.channel.id;
        const samevc = new Discord.MessageEmbed()
        if (bot.distube.getQueue(message) && channel !== message.guild.me.voice.channel.id) {
            samevc.setColor("#FF0000")
            samevc.setFooter(bot.user.username, bot.user.displayAvatarURL())
            samevc.setTitle(`❌ ERROR | Please join my voice channel first`)
            samevc.setDescription(`Channel Name: \`${message.guild.me.voice.channel.name}\``)
            return message.channel.send(samevc)
        };

        const Searchterm = new Discord.MessageEmbed()
        if (!args[0]) {
            Searchterm.setColor("#FF0000")
            Searchterm.setFooter(bot.user.username, bot.user.displayAvatarURL())
            Searchterm.setTitle(`❌ ERROR | You didn't provided a Searchterm`)
            Searchterm.setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
            return message.channel.send(Searchterm)
        };
        const search = new Discord.MessageEmbed()
        search.setTitle(":mag: Searching!");
        search.setDescription(args.join(" "))
        search.setColor("#FFFF00");
        message.channel.send(search)

        spotifyApi.setRefreshToken("AQDV65rh2r_vOR6SZcJVX1l4hnLz6VoIbULhT1BddklkIUSTSKAmF2DLAO-ok3muVKmkjOP-Ppb1GJOzL024TJD-2fXUcwt7zvgZTyVZtMIqLARN6-h9Z30eAChCLw2U1vQ");

        spotifyApi.refreshAccessToken().then(
            function (data) {
                console.log('The access token has been refreshed!');
                console.log(data.body['access_token'])
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
            },
            function (err) {
                console.log('Could not refresh access token', err);
            }
        );

        var link = args.join(" ")
        var split = link.split("/")
        var id = split[4].split("?")[0]
        console.log(id)

        async function getStuff() {
            await spotifyApi.getPlaylist(id)
                .then(function (data) {
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle("ADDED A SPOTIFY PLAYLIST TO QUEUE!");
                    embed.setColor("#FFFF00");
                    embed.setDescription(data.body["name"]);
                    embed.addField(`Playlist Owner`, data.body.owner.display_name)
                    embed.addField(`Total Tracks`, data.body.tracks.total)
                    embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send(embed)
                }, function (err) {
                    console.log('Something went wrong!', err);
                });
        }

        //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
        if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")) {
            getPreview(args.join(" ")).then(result => {
                bot.distube.play(message, result.title);
                message.channel.send(`Added ${result.songl} to the queue`)
            })
        }
        else if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")) {
            getTracks(args.join(" ")).then(result => {
                for (const song of result)
                    bot.distube.play(message, song.name);
                getStuff()
            })
        }
        else {
            const music = args.join(" ");
            bot.distube.play(message, music)
            message.channel.send(`Added ${music} to the queue`)
        }
    }

}




