const mongoose = require('mongoose');
const characters = require('./characters');

const game = new mongoose.Schema({
    id_users: Array,
    status: Number,
    composition: [{ type: mongoose.Schema.Types.ObjectId, ref: "Characters" }],
})

const GameModel = mongoose.model('Game', game)

module.exports = GameModel


