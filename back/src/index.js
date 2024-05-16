require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const gameRoutes = require("./routes/game");
const bodyParser = require("body-parser");
//
const connection = require('./config/connection');
const socketIoInit = require("./config/socketIoConnection");

const app = express();

const corsOptions = {
    origin: "*",
};

// init de la base de donnée
connection();
// init du server socket.io
socketIoInit(app)

// options de configuration
app.use(
    cors(corsOptions),
    bodyParser.json(),
    express.static("public")
);

// init des routes du project
app.use("/users", usersRoutes);
app.use("/game/:idUser", gameRoutes);
app.get("*", (req, res) =>  res.json("Page Introuvable"));

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server launched on PORT : ${process.env.PORT || 4000}. 🦒`);
});
