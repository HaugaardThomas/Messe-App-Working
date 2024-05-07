const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    isSubscriped: {
        type: Boolean,
        default: false
    },
},
{
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', UserSchema)