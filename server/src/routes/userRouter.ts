import express from 'express';

import {
  createUser,
  getAllUsers,
  deleteUserById
} from '../controllers/userController';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validateRequests';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router
  .route('/')
  .post(
    [
      body('email').isEmail().withMessage('Email must be valid'),
      body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    asyncHandler(createUser)
  )
  .get(asyncHandler(getAllUsers));

router.route('/:id').delete(asyncHandler(deleteUserById));

export { router as userRouter };