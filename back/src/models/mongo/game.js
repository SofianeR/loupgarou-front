const mongoose = require("mongoose");

const game = new mongoose.Schema({
  
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },

  id_users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Users",
    required: true
  },

  composition: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Characters",
    required: true
  },

  private: {
    type: Boolean,
    required: true
  },

  password: {
    type: String
  }
});

const GameModel = mongoose.model("Game", game);

module.exports = GameModel;
