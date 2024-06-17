import express from 'express';
import multer from 'multer';

import {
  register,
  login,
  logout,
  getUserProfileById,
  getAllProfiles,
  updateProfile,
  getnameAndEmail,
  loginAdmin
} from '../controllers/userController.js';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/loginAdmin', upload.none(), loginAdmin);
router.post('/logout', upload.none(), logout);
router.get('/getProfile/:idUser', upload.none(), getUserProfileById)
router.get('/getAllProfiles', upload.none(), getAllProfiles)
router.post('/updateProfile/:idUser', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'avatar', maxCount: 1 }
  ]), updateProfile);
router.get('/getnameAndEmail', upload.none(), getnameAndEmail)


export default router;