const express = require("express");
const { getSpotifyTopTracks } = require('../controllers/spotify');
const router = express.Router();


router.get('/top/tracks', getSpotifyTopTracks)


module.exports = router;