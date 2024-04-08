const express = require('express');
const router = express.Router();
const controller = require('../controllers/game.controller');

router.post("/", controller.create)
router.post("/", controller.create)

module.exports = router;
