var express = require('express');
var router = express.Router();

let authenticationController = require('../controllers/users.controller');

router.post('/signup', authenticationController.signup);

router.post('/signin', authenticationController.signin);

module.exports = router;
