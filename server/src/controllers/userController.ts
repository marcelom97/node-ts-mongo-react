import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

import { BadRequestError } from '../errors/badRequestError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return next(new BadRequestError('User already exists'));
  }

  try {
    user = User.build({ username, email, password });
  } catch (err) {
    return next(new BadRequestError("User can't be created"));
  }

  await user!.save();

  res.status(201).json({
    success: true,
    data: user
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    length: users.length,
    data: users
  });
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new BadRequestError('User not exists'));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
};
