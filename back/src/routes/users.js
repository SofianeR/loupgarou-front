const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/users.controller');

router.post("/signin", authenticationController.signIn);
router.post('/signup', authenticationController.signUp);

module.exports = router;
