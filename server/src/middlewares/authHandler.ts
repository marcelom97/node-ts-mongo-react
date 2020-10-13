import jwt, { Secret } from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import { User } from '../models/User';
import { ErrorResponse } from '../errors/errorResponse';

interface Session {
  id: string;
  iat: number;
  exp: number;
}

export const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set toke from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse(
        `Not authorized to access route:${req.originalUrl}`,
        401
      )
    );
  }

  const JWT_SECRET = process.env.JWT_SECRET as Secret;
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as Session;

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse(
        `Not authorized to access route:${req.originalUrl}`,
        401
      )
    );
  }
});
