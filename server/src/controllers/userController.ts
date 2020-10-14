import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../database/Users/users.model';

import { BadRequestError } from '../errors/badRequestError';
import { asyncHandler } from '../middlewares/asyncHandler';

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, firstname, lastname } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return next(new BadRequestError('User already exists'));
    }

    let newUser;
    try {
      newUser = await UserModel.create({
        username,
        email,
        password,
        firstname,
        lastname
      });
    } catch (err) {
      return next(new BadRequestError("User can't be created"));
    }

    res.status(201).json({
      success: true,
      data: newUser
    });
  }
);

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find();

    res.status(200).json({
      success: true,
      length: users.length,
      data: users
    });
  }
);

export const getSpecificUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return next(new BadRequestError('User not exists'));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  }
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new BadRequestError('User not exists'));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
