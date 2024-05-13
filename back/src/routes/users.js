const express = require('express');
const router = express.Router();
const {signupValidator, signinValidator} = require('../validators/users.validator');
const authenticationController = require('../controllers/users.controller');

router.post("/signin", ...signinValidator, authenticationController.signIn);
router.post('/signup', ...signupValidator, authenticationController.signUp);

module.exports = router;
