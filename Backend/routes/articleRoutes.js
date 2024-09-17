import express from "express";
import {
  getArticlesController,
  getNewArticlesController,
  getVotedStatus,
  updateVotesController,
} from "../controller/articleController.js";

const router = express.Router();

router.get("/", getArticlesController);

router.post("/new", getNewArticlesController);

router.put("/", updateVotesController);

router.post("/vote-status", getVotedStatus);

export default router;
