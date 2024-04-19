const express = require("express");

const router = express.Router();

const { Signup, Signin } = require("../controller/auth");

router.post("/signup", Signup);
router.post("/signin", Signin);

module.exports = router;
