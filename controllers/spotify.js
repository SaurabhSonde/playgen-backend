const User = require('../models/user')
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios')
const Vibrant = require('node-vibrant');


const spotifyWebLibrary = () => {
    return new SpotifyWebApi({
        clientId: 'a786ffed2bcc42d7a0ee125d08ce5e0f',
        clientSecret: '4f59a649dcbd4b4998a94819dd5482e3',
        redirectUri: 'http://localhost:4000/api/user/spotify/callback'
    });
}

const getSpotifyTopTracks = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.userId })
        if (data !== null) {
            // initialise spotify web api
            const spotify = spotifyWebLibrary()
            spotify.setAccessToken(data.access_token)
            const response = await spotify.getMyTopTracks()

            res.status(200).json({
                tracks: response.body.items
            })
        } else {
            res.status(500).json({
                message: "User not found, please signin."
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getUsersTopArtist = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.userId })
        if (data !== null) {
            // initialise spotify web api
            const spotify = spotifyWebLibrary()
            spotify.setAccessToken(data.access_token)
            const response = await spotify.getMyTopArtists()
            res.status(200).json({
                artists: response.body.items
            })
        } else {
            res.status(500).json({
                message: "User not found, please signin."
            })
        }

    } catch (error) {
        console.log(error)
    }
}


const getSpotifyGenre = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.userId })
        if (data !== null) {
            // initialise spotify web api
            const spotify = spotifyWebLibrary()
            spotify.setAccessToken(data.access_token)
            const response = await spotify.getMyTopArtists({ limit: 50 })
            const topArtists = response.body.items;
            const genres = {};

            topArtists.forEach(artist => {
                artist.genres.forEach(genre => {
                    if (genres[genre]) {
                        genres[genre] += 1;
                    } else {
                        genres[genre] = 1;
                    }
                });
            });

            const topGenres = Object.keys(genres).sort((a, b) => genres[b] - genres[a]);

            res.status(200).json({
                genres: topGenres
            })
        } else {
            res.status(500).json({
                message: "User not found, please signin."
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getColorPalleteOfTrack = async (req, res) => {
    try {
        const { userId, albumId } = req.params;
        const user = await User.findOne({ _id: userId });
        if (user !== null) {
            const response = await axios({
                method: 'get',
                url: `https://api.spotify.com/v1/albums/${albumId}`,
                headers: {
                    'Authorization': `Bearer ${user.access_token}`
                }
            });

            // Get album cover image URL
            const imageUrl = response.data.images[0].url;

            // Use node-vibrant library to get dominant color
            const palette = await Vibrant.from(imageUrl).getPalette();
            const rgb = palette.Vibrant.rgb;

            // Check if RGB values are defined
            if (rgb) {
                // Convert RGB to hex
                const hex = '#' + [rgb[0], rgb[1], rgb[2]].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');

                res.status(200).json({
                    color: hex
                });
            } else {
                res.status(500).json({ message: 'Internal server error: RGB values are undefined' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = {
    getSpotifyTopTracks,
    getUsersTopArtist,
    getSpotifyGenre,
    getColorPalleteOfTrack
}