const express = require("express");
const router = express.Router();
const controller = require("../controllers/game.controller");

router.post("/create", controller.create);
router.post("/join/:idGame", controller.join);

module.exports = router;