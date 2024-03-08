var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  playername: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});

PlayerSchema.pre('save', function (next) {
    var player = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(player.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                player.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

PlayerSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Player', PlayerSchema);