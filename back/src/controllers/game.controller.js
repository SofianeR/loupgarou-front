const Game = require('../models/mongo/game');
const mongoose = require('mongoose');

exports.create = function (req, res) {
    const { idUser } = req.params;
    const { private, password } = req.body;

    const isPrivate = private === "true"
 
    res.status(200).json({ private: private, msg: idUser })
    
    const newGame = new Game({
        host: new mongoose.Types.ObjectId("662625c9cc8f88cc25961480"),
        id_users: [],
        private: isPrivate,
        password: password
    })

    newGame.save().then((res) => {
        console.log(res)
    }).catch((e) => {
        console.error(e)
    })

}


exports.join = function () {

}