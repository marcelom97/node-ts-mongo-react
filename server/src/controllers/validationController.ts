import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

import { BadRequestError } from '../errors/badRequestError';
import { asyncHandler } from '../middlewares/asyncHandler';

export const validateDuplicateEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    if (!email) {
      return next(new BadRequestError('Please provide a valid email!'));
    }

    const users = await User.find({ email });

    res.status(200).json({
      success: true,
      count: users.length
    });
  }
);

export const validateDuplicateUsername = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;

    if (!username) {
      return next(new BadRequestError('Please provide a valid username!'));
    }

    const users = await User.find({ username });

    res.status(200).json({
      success: true,
      count: users.length
    });
  }
);
