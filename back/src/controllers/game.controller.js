const config = require('../config/config');
const Game = require('../models/mongo/game');
const mongoose = require('mongoose');

exports.create =  (req, res) => {
    const { idUser } = req.params;
    const { private, password } = req.body;
    const isPrivate = private === "true"
 
    new Game({
        host: new mongoose.Types.ObjectId(idUser),
        id_users: [new mongoose.Types.ObjectId(idUser)],
        private: isPrivate,
        password: isPrivate ? password : undefined
    }).save().then((response) => {
        res.status(200).json({ isSuccess: true, response: { game_id: response._id }});
    }).catch((e) => {
        console.log(e)
        res.status(500).json({ isSuccess: false, response: e });
    });
};

exports.join = (req, res) => {
    const { idUser, idGame } = req.params;
    const { private, password } = req.body;

    const isPrivate = private === 'true';

    try {

        if(isPrivate || !password) {
            return res.status(config.HTTP.RESPONSE.KO.CODE).json({ isSuccess: false, response: 'Aucun password donnée' });
        }
        
        // TODO: passer ça en find et check chaque options
        Game.findOneAndUpdate({
            _id: idGame,
            password: isPrivate ? password : undefined
        }, 
            { $push: { id_users: new mongoose.Types.ObjectId(idUser) }}, 
            { $addToSet: { id_users: idUser } 
        }).then((response) => {
            res.status(config.HTTP.RESPONSE.OK.CODE).json({ isSuccess: true, response: { game_id: response }});
        }).catch((e) => {
            console.log(e)
            res.status(config.HTTP.RESPONSE.KO.CODE).json({ isSuccess: false, response: e.message });
        })
    } catch(e) {
        console.log(e)
        res.status(config.HTTP.RESPONSE.INTERNAL_ERROR.CODE).json({ isSuccess: false, response: e.message });
    }
}

exports.get = (req, res) => {
    const { idGame } = req.body;

    if(idGame) {
        Game.find({
            _id: idGame
        })
    } else {

    }
}