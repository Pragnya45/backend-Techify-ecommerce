const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      role: "GENERAL",
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

async function Signin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not Found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("please check password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

async function Signout(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      data: [],
      message: "Logout Successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = { Signup, Signin, Signout };
