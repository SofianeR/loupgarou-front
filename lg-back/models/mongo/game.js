const mongoose = require('mongoose')

const game = new mongoose.Schema({
    id: Number,
    id_players: Array,
    status: Number,
})

const GameModel = mongoose.model('Game', game)

module.exports = GameModel