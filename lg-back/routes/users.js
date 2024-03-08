var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');

const controller = new UserController()

/* GET users listing. */
router.post('/login', controller.login);

router.post('/register', controller.register)

module.exports = router;
