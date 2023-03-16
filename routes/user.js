const express = require("express");
const { spotifyCallback } = require('../controllers/user');
const router = express.Router();
const passport = require('passport');


router.get('/spotify/login', passport.authenticate('spotify'))

router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/spotify/login' }), spotifyCallback)


module.exports = router;