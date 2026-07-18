// middleware/validate.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../errors/appErrors.js';
import { ZodType } from 'zod';

type Target = 'body' | 'query' | 'params';

export function validationHandler(schema: ZodType, target: Target): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.input === undefined ? `${issue.path.join('.')} is required` : issue.message,
      }));

      return next(new AppError(400, 'Validation failed', errors));
    }

    if (target === 'query') {
      Object.defineProperty(req, 'query', {
        value: result.data,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } else {
      req[target] = result.data;
    }

    req[target] = result.data;

    next();
  };
}
