const express = require("express");

const router = express.Router();

const Signup = require("../controller/auth");

router.post("/signup", Signup);

module.exports = router;
