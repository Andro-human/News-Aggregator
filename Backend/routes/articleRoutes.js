import express from 'express';
import { getArticlesController, updateVotesController } from '../controller/articleController.js';

const router = express.Router();

router.get('/', getArticlesController);

router.put('/', updateVotesController);

export default router;
