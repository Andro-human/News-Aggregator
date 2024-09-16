import jwt from "jsonwebtoken";
import config from "../config/config.js";


const sendToken = (res, user, statusCode, message) => {
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "15d",
    });
    res
      .status(statusCode)
      .cookie("Login-token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "none",  // prevent csrf attacks & cross-site request forgery attacks
        httpOnly: true, // prevent xss attacks & cross-site scripting attacks
        secure: true,
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  };

  export {sendToken}