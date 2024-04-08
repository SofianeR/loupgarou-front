const mongoose = require("mongoose");

const characters = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  list_actions: {
    type: Array,
  },
});

const CharactersModel = mongoose.model("Characters", characters);

module.exports = CharactersModel;
