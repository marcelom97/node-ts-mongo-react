import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
  fn: (
    arg0: Request<
      import('express-serve-static-core').ParamsDictionary,
      any,
      any,
      import('qs').ParsedQs
    >,
    arg1: Response<any>,
    arg2: NextFunction
  ) => any
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
