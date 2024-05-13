const jwt = require("jsonwebtoken");
const User = require("../models/mongo/users");

exports.signUp = async (req, res) => {


  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.json({
      isSuccess: false,
      msg: "Merci de renseigner un username, email et mot de passe.",

    });
  } else if(password.length < 5) {
    return res.status(500).json({ message: 'Le mot de passe doit contenir au moins 4 caractères', isSuccess: false });


  } else {
    try {
      let newUser = new User({

        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: password,
      });
      
      await newUser.save();


      const token = jwt.sign(newUser.toJSON(), process.env.SECRET_TOKEN);

      return res.status(200).json({
        message: "Votre compte à bien été crée",
        data: { id: newUser["_id"], token, username: newUser["username"] },
        isSuccess: true,
      });

    } catch (error) {
    console.log(error)

      return res.status(500).json({ message: error.message, isSuccess: false });
    }
  }
};

exports.signIn = async (req, res) => {
  try {
  let user = User.findOne({ username: req.body.username.toLowerCase() })
  if (user) {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN);
        // return the information including token as JSON
        return res.status(200).json({
          message: "Authentification réussie",
          data: {
            id: user["_id"],
            token: token,
            username: user["username"],
          },
          isSuccess: true,
        });
      } else {
        res.status(500).json({
          message: "Échec authentification, veuillez réessayer",
          isSuccess: false,
        });
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Aucun user correspondant", isSuccess: false });
  }
 
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message, isSuccess: false });
  }
};
