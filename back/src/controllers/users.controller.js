const jwt = require("jsonwebtoken");
const User = require("../models/mongo/users");

exports.signUp = async (req, res) => {

  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.json({
      isSuccess: false,
      msg: "Merci de renseigner un username, email et mot de passe.",
    });
  } else {
    try {
      let newUser = new User({
        email: email,
        username: username,
        password: password,
      });
      
      await newUser.save();

      return res.status(200).json({ message: newUser, isSuccess: true });
    } catch (error) {
      return res.status(500).json({ message: error.message, isSuccess: false });
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
