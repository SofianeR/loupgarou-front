var express = require('express');
var router = express.Router();

let authenticationController = require('../controllers/users.controller');

router.post('/signup', authenticationController.signup);

module.exports = router;
