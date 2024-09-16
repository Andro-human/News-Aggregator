import express from "express";
import {
  loginController,
  registerController,
} from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware, loginController);

router.post("/register", registerController);

export default router;
