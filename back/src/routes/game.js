const express = require("express");
const router = express.Router();
const controller = require("../controllers/game.controller");

router.post("/:idUser", controller.create);
router.post("/", (req, res) => {
    res.status(200).json({
        test: "1    "
    })
});

module.exports = router;
