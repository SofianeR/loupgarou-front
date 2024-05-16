require("dotenv").config()

const express = require("express");
const cors = require("cors");

const usersRoutes = require("./src/routes/users");
const gameRoutes = require("./src/routes/game");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log('success mongo connection')
}).catch((e) => {
  console.error('ERROR MONGO: ', e.errorResponse.errmsg)
})

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/users", usersRoutes);
app.use("/game/:idUser", gameRoutes);

app.get("/", async (req, res) => {
  res.json("Page Introuvable");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server launched on PORT : ${process.env.PORT || 4000}. 🦒`);
});