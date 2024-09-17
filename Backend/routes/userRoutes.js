import express from "express";
import {
  loginController,
  registerController,
  getUserController,
  logoutController,
} from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.get("/profile", authMiddleware, getUserController);

router.get("/logout", authMiddleware, logoutController);

export default router;
