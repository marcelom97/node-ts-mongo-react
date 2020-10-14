import { UserModel } from '../database/Users/users.model';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/badRequestError';
import { PasswordManager } from '../services/passwordManager';
import { ErrorResponse } from '../errors/errorResponse';
import { asyncHandler } from '../middlewares/asyncHandler';
import { sendEmail } from '../services/forgotPasswordConfirmationEmail';

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse('Please provide an email and a password', 400)
      );
    }

    const user = await UserModel.findOne({ email }).select('+password');

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

export const registerNewUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, firstname, lastname } = req.body;
    const user = await UserModel.create({
      username,
      email,
      password,
      firstname,
      lastname
    });

    sendTokenResponse(user, 200, res);
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \nPlease follow the link to change your password: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
      });

      res.status(200).json({ success: true, data: 'Email sent', resetToken });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  }
);

const sendTokenResponse = async (user: any, statusCode: number, res: any) => {
  const token = await user.getSignedJwtToken();

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
