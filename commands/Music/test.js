const Discord = require("discord.js");
var SpotifyWebApi = require("spotify-web-api-node")
var spotifyApi = new SpotifyWebApi({
    clientId: '3a80dcbbc9ed40fa98dbbdcf09c4e1c3',
    clientSecret: 'ba8021e08dbb4251817fcec09b8b175b',
    redirectUri: 'http://www.example.com/callback/'
});

module.exports = {
    name: "test",
    aliases: [""],
    accessableby: "Manage Messages",
    description: "Check ping of the bot",
    usage: ">>autoplay",
    example: ">>autoplay",
    cooldown: 5,
    category: "Music",
    run: async (bot, message, args) => {
        spotifyApi.setRefreshToken("AQDV65rh2r_vOR6SZcJVX1l4hnLz6VoIbULhT1BddklkIUSTSKAmF2DLAO-ok3muVKmkjOP-Ppb1GJOzL024TJD-2fXUcwt7zvgZTyVZtMIqLARN6-h9Z30eAChCLw2U1vQ");

        spotifyApi.refreshAccessToken().then(
            function (data) {
                console.log('The access token has been refreshed!');
                console.log(data.body['access_token'])
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);

                getStuff()
            },
            function (err) {
                console.log('Could not refresh access token', err);
            }
        );
        var link = "https://open.spotify.com/playlist/1EVz4uIsgRcYtg8QbQQzZU?si=87K-o9aCTDCLoaLPPTUSPQ"
        var split = link.split("/")
        console.log(split[4])
        
        async function getStuff() {
            await spotifyApi.getPlaylist('1EVz4uIsgRcYtg8QbQQzZU')
                .then(function (data) {
                    console.log('Some information about this playlist', data.body["name"]);
                    console.log('Some information about this playlist', data.body.owner.display_name);
                    console.log('Some information about this playlist', data.body.tracks.total);
                }, function (err) {
                    console.log('Something went wrong!', err);
                });
        }

    }

}