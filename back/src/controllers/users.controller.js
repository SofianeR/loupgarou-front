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
    } catch ({ errorResponse }) {
      console.log(errorResponse);

      // 11000 = error email dupliqué
      if (errorResponse?.code === 11000) {
        let message = `la valeur ${
          errorResponse.keyValue?.email || errorResponse.keyValue?.username
        } est dupliqué`;
        return res.status(400).json({ message: message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: errorResponse.message, isSuccess: false });
      }
    }
  }
};

exports.signIn = async (req, res) => {
  try {
    User.findOne({ username: req.body.username.toLowerCase() }).then((user) => {
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
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, isSuccess: false });
  }
};

exports.getSingleUserData = async (req, res) => {
  // console.log(req.body);
  console.log("je suis dans la route");
  res.status(200).json({ message: "req.body", isSuccess: true });

  // try {
  //   if (req.body.id) {
  //     const userData = await User.findOne({ _id: req.body.id }).then(
  //       (userData) => {
  //         if (userData) {
  //           res.status(200).json({ message: userData, isSuccess: true });
  //         } else {
  //           res.status(400).json({
  //             message: "Erreur Server : Aucun user trouvé",
  //             isSuccess: false,
  //           });
  //         }
  //       }
  //     );
  //   } else {
  //     res.status(400).json({
  //       message: "Erreur Server : Informations manquantes",
  //       isSuccess: false,
  //     });
  //   }
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(500).json({ message: error.message, isSuccess: false });
  // }
};
