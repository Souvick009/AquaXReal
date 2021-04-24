const Discord = require("discord.js");
const prefix = '>>';
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { getTracks, getPreview } = require("spotify-url-info");
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

module.exports = {
    name: "test",
    aliases: [''],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>play",
    example: ">>play ",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {

        spotifyApi.getPlaylist('1EVz4uIsgRcYtg8QbQQzZU')
            .then(function (data) {
                console.log('Some information about this playlist', data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
            });

    }
}