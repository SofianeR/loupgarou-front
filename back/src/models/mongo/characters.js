const mongoose = require('mongoose');

const characters = new mongoose.Schema({
    name: String,
    description: String,
    list_actions: Array,
})

const CharactersModel = mongoose.model('Characters', characters)

module.exports = CharactersModel