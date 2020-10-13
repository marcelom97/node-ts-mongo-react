import express from 'express';

import {
  createUser,
  getAllUsers,
  deleteUserById,
  getSpecificUser
} from '../controllers/userController';

import { validateRequest } from '../middlewares/validateRequests';

const router = express.Router();

router.route('/').post(validateRequest, createUser).get(getAllUsers);

router.route('/:id').delete(deleteUserById).get(getSpecificUser);

export { router as userRouter };
