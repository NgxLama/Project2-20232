import express from 'express';
import multer from 'multer';

import {
  getAllMovie,
  findMovie
} from '../controllers/movieController.js';

const router = express.Router();
const upload = multer();

router.get('/getAllMovie', upload.none(), getAllMovie);
router.get('/findMovie', upload.none(), findMovie);

export default router;