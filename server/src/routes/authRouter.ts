import express from 'express';
import { loginUser, getCurrentUser } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { protect } from '../middlewares/authHandler';

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/currentuser').get(protect, getCurrentUser);

export { router as authRouter };
