import express from 'express';
import multer from 'multer';

import {
  getAllMovie
} from '../controllers/movieController.js';

const router = express.Router();
const upload = multer();

router.get('/getAllMovie', upload.none(), getAllMovie);

export default router;