const express = require("express");

const router = express.Router();

const { Signup, Signin, Signout } = require("../controller/auth");
const { userDetails } = require("../controller/user");
const { authToken } = require("../middleware/index");

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/signout", Signout);
router.get("/user", authToken, userDetails);

module.exports = router;
