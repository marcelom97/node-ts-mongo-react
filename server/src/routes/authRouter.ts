import express from 'express';
import { loginUser } from '../controllers/authController';

const router = express.Router();

router.route('/login').post(loginUser);

export { router as authRouter };
