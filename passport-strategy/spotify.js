const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


passport.use(
    new SpotifyStrategy(
        {
            clientID: 'a786ffed2bcc42d7a0ee125d08ce5e0f',
            clientSecret: '4f59a649dcbd4b4998a94819dd5482e3',
            callbackURL: 'http://localhost:4000/api/user/spotify/callback',
            scope: ['user-read-email', 'user-read-private', 'user-top-read']
        },
        async (accessToken, refreshToken, expires_in, profile, done) => {
            try {

                let spotifyData = {
                    connection_app_name: 'Spotify',
                    connection_app_id: profile.id,
                    connection_app_username: profile.username,
                    connection_app_subscription: profile.product,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profile_pic: profile.photos[0].value,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_in: expires_in
                }

                return done(null, spotifyData);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);