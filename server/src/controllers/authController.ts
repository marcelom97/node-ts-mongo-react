import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/badRequestError';
import { PasswordManager } from '../services/passwordManager';
import { ErrorResponse } from '../errors/errorResponse';
import { asyncHandler } from '../middlewares/asyncHandler';

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse('Please provide an email and a password', 400)
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new BadRequestError('User not exists'));
    }

    const matchPasswords = await PasswordManager.compare(
      user.password,
      password
    );

    if (!matchPasswords) {
      return next(new BadRequestError('Wrong Credentials'));
    }

    sendTokenResponse(user, 200, res);
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  }
);

export 

const sendTokenResponse = (user: any, statusCode: number, res: any) => {
  const token = user.getSignedJwtToken();

  const JWT_COOKIE_EXPIRE = parseInt(process.env.JWT_COOKIE_EXPIRE!);
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};
