const express = require("express");
const { getSpotifyTopTracks, getUsersTopArtist, getSpotifyGenre, getColorPalleteOfTrack } = require('../controllers/spotify');
const router = express.Router();



router.get('/top/tracks/:userId', getSpotifyTopTracks)

router.get('/top/artist/:userId', getUsersTopArtist)

router.get('/genre/:userId', getSpotifyGenre)

router.get('/pallete/:userId/:albumId', getColorPalleteOfTrack)

module.exports = router;