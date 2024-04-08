const Game = require('../models/mongo/game');

exports.create = function (req, res) {

    if (false) {
    } else {
        let newGame = new Game({

        })

        newGame.save(() => {
            if (err) {
            }
            res.json({success: true, msg: 'Successful created new user.'});
        })
    }

}


exports.join = function () {

}

exports.create = function () {

}