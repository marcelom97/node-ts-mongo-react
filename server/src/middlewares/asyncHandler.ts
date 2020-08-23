import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
  fn: (arg0: Request, arg1: Response, arg2: NextFunction) => any
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
