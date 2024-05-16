const router = require("express").Router();
const {create, join, get} = require("../controllers/game.controller");

router.post("/create", create);
router.post("/join/:idGame", join);
router.post("/", get)

module.exports = router;
