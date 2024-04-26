const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// UserSchema.methods.comparePassword = (passw, cb) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(passw, this.password, (err, isMatch) => {
//       if (err) {
//         // console.log("dans model user err => ", err);
//         reject(cb(err));
//       }
//       resolve(cb(null, isMatch));
//       // console.log("dans model user isMatch => ", isMatch);
//     });
//   });
// };

module.exports = mongoose.model("User", UserSchema);
