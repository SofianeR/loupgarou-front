const mongoose = require("mongoose");

const game = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  id_users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Users",
  },
  composition: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Characters",
  },
  status: {
    type: Number,
  },
  private: {
    type: Boolean,
  },
});

const GameModel = mongoose.model("Game", game);

module.exports = GameModel;
