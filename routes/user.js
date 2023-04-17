const express = require("express");
const { spotifyCallback, getUserInfo } = require('../controllers/user');
const router = express.Router();
const passport = require('passport');


router.get('/spotify/login', passport.authenticate('spotify'))


router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/spotify/login' }), spotifyCallback)

router.get('/info/:userId', getUserInfo)


module.exports = router;