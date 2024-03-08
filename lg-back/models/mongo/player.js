const mongoose = require('mongoose')

const player = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    role: Number,
})

const PlayerModel = mongoose.model('Player', player)

module.exports = PlayerModel