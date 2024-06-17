import express from 'express';
import multer from 'multer';

import {
  getAllMovie,
  findMovie, 
  getMovieById,
  getAllSeatsOfRoom,
  savePayment,
  updatePayment,
  getOrderById,
  getAllOrdersOfUser,
  deleteOrderById,
  addMovie,
  updateMovieById,
  deleteMovieById,
  getAllRooms,
  addShowtime,
  getAllShowtimes,
  deleteShowtimeById,
  updateShowtimeById,
  getLayoutById,
  getAllOrders
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
router.get('/getAllOrdersOfUser/:id', upload.none(), getAllOrdersOfUser)
router.get('/getAllOrders', upload.none(), getAllOrders)
router.post('/deleteOrderById/:id', upload.none(), deleteOrderById);
router.post('/addMovie/', upload.single('poster'), addMovie);
router.put('/updateMovieById/:id', upload.single('poster'), updateMovieById);
router.delete('/deleteMovieById/:id', upload.none(), deleteMovieById);
router.get('/getAllRooms', upload.none(), getAllRooms);
router.post('/addShowtime', upload.none(), addShowtime);
router.get('/getAllShowtimes', upload.none(), getAllShowtimes);
router.delete('/deleteShowtimeById/:id', upload.none(), deleteShowtimeById);
router.put('/updateShowtimeById/:id', upload.none(), updateShowtimeById);
router.get('/getLayoutById/:id', upload.none(), getLayoutById);

export default router;