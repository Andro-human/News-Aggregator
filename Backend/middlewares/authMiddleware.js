import jwt from "jsonwebtoken";
import config from "./../config/config.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["Login-token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this route" });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in authMiddleware" });
  }
};

export default authMiddleware;
