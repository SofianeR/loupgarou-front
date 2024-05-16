const router = require("express").Router();

const {signUp, signIn} = require("../controllers/users.controller");
const {signinValidator, signupValidator} = require('../validators/users.validator');

router.post("/signin", ...signinValidator, signIn);
router.post("/signup", ...signupValidator, signUp);

module.exports = router;
