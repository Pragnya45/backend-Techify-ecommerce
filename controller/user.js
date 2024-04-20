const userModel = require("../models/user");

async function userDetails(req, res) {
  try {
    console.log(req.userId);
    const user = await userModel.findById(req.userId);
    res.status(200).json({
      data: user,
      message: "User Details",
      error: true,
      success: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = { userDetails };
