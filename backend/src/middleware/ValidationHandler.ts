// middleware/validate.ts

import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appErrors.js';

export function validateHandler(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new AppError(400, result.error.issues[0].message));
    }

    req.body = result.data;

    next();
  };
}
