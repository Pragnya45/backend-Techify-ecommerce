const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(200).json({
        message: "User not login",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      console.log(err);
      if (err) {
        console.log(err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = { authToken };
