const Game = require('../models/mongo/game');
const mongoose = require('mongoose');

exports.create =  (req, res) => {
    const { idUser } = req.params;
    const { private, password } = req.body;
    const isPrivate = private === "true"
 
    new Game({
        host: new mongoose.Types.ObjectId(idUser),
        id_users: [],
        private: isPrivate,
        password: password
    }).save().then((res) => {
        console.log(res)
        res.status(200).json({ isSuccess: true, response: res })
    }).catch((e) => {
        res.status(500).json({ isSuccess: false, response: e })
    });
};


exports.join = () => {

}