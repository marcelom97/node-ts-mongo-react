import { IUserDocument } from './users.types';
import crypto from 'crypto';
import { Secret, sign } from 'jsonwebtoken';

export async function getResetPasswordToken(
  this: IUserDocument
): Promise<String> {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set Expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 100;

  return resetToken;
}

export async function getSignedJwtToken(this: IUserDocument): Promise<String> {
  const JWT_SECRET = process.env.JWT_SECRET as Secret;
  const JWT_EXPIRE = process.env.JWT_EXPIRE;
  return sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
}
