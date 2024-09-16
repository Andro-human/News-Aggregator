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
    console.log("error in register API", error);

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

export { loginController, registerController };
