require("dotenv").config();

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./src/routes/users");
const gameRoutes = require("./src/routes/game");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);

const app = express();
app.use(cors());

app.use(usersRoutes);
app.use(gameRoutes);

app.get("/", async (req, res) => {
    res.json("Page Introuvable");
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server launched on PORT : ${process.env.PORT || 4000}. 🦒`);
});