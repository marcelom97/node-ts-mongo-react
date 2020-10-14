import express from 'express';
import {
  loginUser,
  getCurrentUser,
  registerNewUser
} from '../controllers/authController';
import { protect } from '../middlewares/authHandler';

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerNewUser);
router.route('/currentuser').get(protect, getCurrentUser);

export { router as authRouter };
