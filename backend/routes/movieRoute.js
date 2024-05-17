import express from 'express';
import multer from 'multer';

import {
  getAllMovie,
  findMovie, 
  getMovieById,
  getAllSeatsOfRoom,
  savePayment,
  updatePayment,
  getOrderById
} from '../controllers/movieController.js';

const router = express.Router();
const upload = multer();

router.get('/getAllMovie', upload.none(), getAllMovie);
router.get('/findMovie', upload.none(), findMovie);
router.get('/getMovieById/:id', upload.none(), getMovieById);
router.get('/getAllSeatsOfRoom/:id', upload.none(), getAllSeatsOfRoom);
router.post('/savePayment', upload.none(), savePayment);
router.post('/updatePayment/:id', upload.none(), updatePayment);
router.get('/getOrderById/:id', upload.none(), getOrderById)

export default router;