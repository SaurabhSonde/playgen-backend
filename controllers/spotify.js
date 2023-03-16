const User = require('../models/user')
const SpotifyWebApi = require('spotify-web-api-node');


const spotifyWebLibrary = () => {
    return new SpotifyWebApi({
        clientId: 'a786ffed2bcc42d7a0ee125d08ce5e0f',
        clientSecret: '4f59a649dcbd4b4998a94819dd5482e3',
        redirectUri: 'http://localhost:4000/api/user/spotify/callback'
    });
}

const getcookie = (req) => {
    const values = req.headers.cookie.split(';').reduce((res, item) => {
        const data = item.trim().split('=');
        return { ...res, [data[0]]: data[1] };
    }, {});

    return values.spotifyId
}


const getSpotifyTopTracks = async (req, res) => {
    try {
        const data = await User.findOne({ connection_app_id: getcookie(req) })
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

module.exports = {
    getSpotifyTopTracks
}