import express from "express";
import { getArticlesController } from "../controller/articleController.js";

const router = express.Router();

router.get("/articles", getArticlesController);

export default router;
