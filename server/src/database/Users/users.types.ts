import { Document, Model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: number;
  createdAt?: string;
  getResetPasswordToken(): string;
  getSignedJwtToken(): string;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
