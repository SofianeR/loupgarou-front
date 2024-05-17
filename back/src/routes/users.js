const router = require("express").Router();

const {
  signUp,
  signIn,
  getOne,
  updateOne,
} = require("../controllers/users.controller");
const {
  signinValidator,
  signupValidator,
} = require("../validators/users.validator");

router.post("/signin", ...signinValidator, signIn);
router.post("/signup", ...signupValidator, signUp);
router.post("/fetch", getOne);
router.post("/update", updateOne);

module.exports = router;
