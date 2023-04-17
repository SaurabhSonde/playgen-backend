const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')

const app = express();

// passport initialization
require('./passport-strategy/spotify')

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(session({
    secret: 'playgen',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
}))

// Connect to the database
mongoose.connect('mongodb://localhost:27017/playgen', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to database'))
    .catch(error => console.error(error));


// Routes
app.use('/api/user', require('./routes/user'))
app.use('/api/spotify', require('./routes/spotify'))

app.get('/success', async (req, res) => {
    res.status(200).json({
        message: "Success"
    })
})

// Start the server
app.listen(4000, () => {
    console.log('Server started on port 4000');
});
