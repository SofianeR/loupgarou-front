const config = require("../config/config");
const Game = require("../models/mongo/game");

const User = require("../models/mongo/users");

const mongoose = require("mongoose");

const create = (req, res) => {
  const { private, password, idUser } = req.body;
  console.log(idUser);
  const isPrivate = private === "true";


  // création de la partie
  new Game({
    host: new mongoose.Types.ObjectId(idUser),
    id_users: [new mongoose.Types.ObjectId(idUser)],
    // status de la partie (privé / public)
    private: isPrivate,
    // si le status de la partie on lui définie le mot de passe donné
    password: isPrivate ? password : undefined,
  })
    .save()
    .then((response) => {
      res
        .status(200)
        .json({ isSuccess: true, response: { game_id: response._id } });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ isSuccess: false, response: e.message });
    });
};

const join = (req, res) => {
  const { idUser, idGame } = req.params;
  const { private, password } = req.body;

  const isPrivate = private === "true";


  try {
    // si la partie est privé et ue aucun mdp n'a été fourni on retourne une erreur
    if (isPrivate && !password) {
      return res
        .status(config.HTTP.RESPONSE.KO.CODE)
        .json({ isSuccess: false, response: "Aucun password donnée" });
    }

    Game.findOneAndUpdate(
      { _id: idGame, password: isPrivate ? password : undefined },
      { $push: { id_users: new mongoose.Types.ObjectId(idUser) } },
      { $addToSet: { id_users: idUser } }
    )
      .then((response) => {
        if (response === null) {
          res.status(config.HTTP.RESPONSE.OK.CODE).json({
            isSuccess: false,
            response: "Le mot de passe incorrect",
          });
        } else {
          res
            .status(config.HTTP.RESPONSE.OK.CODE)
            .json({ isSuccess: true, response: { game_id: response._id } });
        }
      })
      .catch((e) => {
        console.log(e);
        res
          .status(config.HTTP.RESPONSE.KO.CODE)
          .json({ isSuccess: false, response: e.message });
      });
  } catch (e) {
    console.log(e);
    res
      .status(config.HTTP.RESPONSE.INTERNAL_ERROR.CODE)
      .json({ isSuccess: false, response: e.message });
  }
};

const get = (req, res) => {
  const { idGame } = req.body;
  // si un identifiant de partie est fourni alors on recherche la partie demandé
  if (idGame) {
    Game.findOne({
      _id: idGame,

    })
      .populate({ path: "host", select: "-password -email -__v" })
      .populate({ path: "id_users", select: "-password -email -__v" })
      .then((response) => {
        res
          .status(config.HTTP.RESPONSE.OK.CODE)
          .json({ isSuccess: true, response: response });
      });

  } else {
    // si aucun id fourni on récuopère la list des partie
    Game.find().then((response) => {
      res
        .status(config.HTTP.RESPONSE.OK.CODE)
        .json({ isSuccess: true, response: response });
    });
  }
};

module.exports = {
  join,
  get,
  create,
};
