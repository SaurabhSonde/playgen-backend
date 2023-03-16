const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        connection_app_name: {
            type: String,
            required: true
        },
        connection_app_id: {
            type: String,
            required: true,
        },
        connection_app_username: {
            type: String,
            required: true,
        },
        connection_app_subscription: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profile_pic: {
            type: String,
            required: true,
        },
        access_token: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            required: true,
        },
        expires_in: {
            type: Number,
        }
    }
)

module.exports = mongoose.model("User", userSchema);