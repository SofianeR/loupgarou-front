const jwt = require("jsonwebtoken");
const User = require("../models/mongo/users");

exports.signUp = async (req, res) => {
  console.log("JE SUIS UN BODY => ", req.body);
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({
      success: false,
      msg: "Merci de renseigner un username, email et mot de passe.",
    });
  } else {
    try {
      let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      // save the user
      await newUser.save();

      return res.status(200).json({ message: newUser, statut: "OK" });
    } catch (error) {
      console.log("catch singup => ", error.message);
      return res.status(500).json({ message: error.message, statut: "NOK" });
    }
  }
};

exports.signIn = (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN);
            // return the information including token as JSON
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
};
