// middleware/validate.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../errors/appErrors.js';
import { ZodType } from 'zod';

type Target = 'body' | 'query' | 'params';

export function validationHandler(schema: ZodType, target: Target): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return next(new AppError(400, result.error.issues[0].message));
    }

    req[target] = result.data;

    next();
  };
}
