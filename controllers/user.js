const User = require("../models/user")


const spotifyCallback = async (req, res) => {
    try {
        if (req.user === null) return res.status(500).json({ error: 'Auth failed' });
        const user = await User.findOne({ connection_app_id: req.user.connection_app_id })
        if (user !== null) {
            user.connection_app_name = req.user.connection_app_name
            user.connection_app_id = req.user.connection_app_id
            user.connection_app_username = req.user.connection_app_username
            user.connection_app_subscription = req.user.connection_app_subscription
            user.name = req.user.name
            user.email = req.user.email
            user.profile_pic = req.user.profile_pic
            user.access_token = req.user.access_token
            user.refresh_token = req.user.refresh_token
            user.expires_in = req.user.expires_in
            await user.save()
            res.cookie('spotifyId', req.user.connection_app_id)
            res.redirect(`http://localhost:4000/success`)
        } else {
            const data = User.create(req.user)
            res.cookie('spotifyId', req.user.connection_app_id)
            res.redirect(`http://localhost:4000/success`)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = {
    spotifyCallback
}