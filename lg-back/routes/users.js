var express = require('express');
var router = express.Router();
const { default: usersController } = require('../controllers/users.controller');

/* GET users listing. */
router.post('/login', usersController.login);

router.post('/register', usersController.register)


module.exports = router;
