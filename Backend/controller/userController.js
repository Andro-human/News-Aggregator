import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../model/userModel.js";
import { sendToken } from "../utils/features.js";
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        status: false,
        message: "username or password missing!",
        data: { username, password },
      });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(404).send({
        status: false,
        message: "no user found for current username!",
        data: { username },
      });
    }

    // Correct password check
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(401).send({
        status: false,
        message: "Invalid credentials!",
        data: { username, password },
      });
    }

    // const jwtToken = jwt.sign(
    //   // eslint-disable-next-line no-underscore-dangle
    //   { userId: existingUser?._id },
    //   config.jwtSecret,
    //   { expiresIn: '1d' }
    // );

    sendToken(res, existingUser, 201, `Welcome back, ${existingUser.username}`);
  } catch (error) {
    console.log("error in login API", error);

    return res.status(500).send({
      status: false,
      message: "error logging existing user!",
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        status: false,
        message: "username or password missing!",
        data: { username, password },
      });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(409).send({
        status: false,
        message: "User already exists!",
        data: { username },
      });
    }

    // Hashing password before storing it in db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in db
    const user = await userModel.create({ username, password: hashedPassword });

    sendToken(res, user, 201, "User created successfully");

  } catch (error) {
    console.log("error in register API", error);

    return res.status(500).send({
      status: false,
      message: "error creating new user!",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId });
    return res.status(200).json({
      success: true,
      message: "User fectched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getUser API",
      error,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("Login-token", "none", {
      // setting the cookie to none and expires to 0
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Logout API",
      error,
    });
  }
};

export { loginController, registerController, getUserController, logoutController };
