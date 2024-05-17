const jwt = require("jsonwebtoken");
const User = require("../models/mongo/users");

const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  // vérification que les params sont bien renseigné
  if (!username || !password || !email) {
    res.json({
      isSuccess: false,
      msg: "Merci de renseigner un username, email et mot de passe valide.",
    });
  } else {
    // creation du compte
    try {

      // creation model du compte a crée
      let newUser = new User({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: password,
      });

      // enregistrement dans la base de donnée du model
      await newUser.save();

      // création du token de l'utilisateur
      const token = jwt.sign(newUser.toJSON(), process.env.SECRET_TOKEN);

      // retour ok
      return res.status(200).json({
        message: "Votre compte à bien été crée",
        data: { id: newUser["_id"], token, username: newUser["username"] },
        isSuccess: true,
      });
    } catch ({ errorResponse }) {
      console.log(errorResponse);
      // code => 11000 = error email/username dupliqué
      if (errorResponse?.code === 11000) {

        let messageError = `la valeur ${
          errorResponse.keyValue?.email || errorResponse.keyValue?.username
        } est dupliqué`;

        return res.status(400).json({ message: messageError, isSuccess: false });

      } else {

        return res
          .status(500)
          .json({ message: errorResponse.message, isSuccess: false });

      }
    }
  }
};

const signIn = async (req, res) => {
  const { username, password} = req.body;
  // vérification que les params sont bien renseigné
  if (!username || !password) {
    res.json({
      isSuccess: false,
      msg: "Merci de renseigner un username valide.",
    });
  } else {
    try {
      User.findOne({ username: req.body.username.toLowerCase() }).then((data) => {
        if (data) {
          data.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(data.toJSON(), process.env.SECRET_TOKEN);
              // return the information including token as JSON
              return res.status(200).json({
                message: "Authentification réussie",
                data: {
                  id: data["_id"],
                  token: token,
                  username: data["username"],
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
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, isSuccess: false });
    }
  }
};

const getOne = async (req, res) => {
  try {
    User.findById();
  } catch (error) {}
};

module.exports = {
  signIn,
  signUp,
  getOne
}