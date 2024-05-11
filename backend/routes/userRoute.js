import express from 'express';
import multer from 'multer';

import {
  register,
  login,
  logout,
  getUserProfileById,
  updateProfile
} from '../controllers/userController.js';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/logout', upload.none(), logout);
router.get('/getProfile/:idUser', upload.none(), getUserProfileById)
router.post('/updateProfile/:idUser', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'avatar', maxCount: 1 }
  ]), updateProfile);

export default router;