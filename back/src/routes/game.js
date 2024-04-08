const express = require("express");
const router = express.Router();
const controller = require("../controllers/game.controller");

router.post("/game/create", controller.create);
router.post("/game", controller.create);

module.exports = router;
