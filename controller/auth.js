const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

async function Signup(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("Already this email exist");
    }
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }
    if (!name) {
      throw new Error("please provide name");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Something is wrong");
    }
    const payload = {
      ...req.body,
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Account created Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = Signup;
