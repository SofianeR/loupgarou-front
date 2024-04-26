require("dotenv").config()

const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const gameRoutes = require("./routes/game");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log('success mongo connection')
}).catch((e) => {
  console.error('error mongo: ', e)
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
