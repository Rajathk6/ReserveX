import { NextFunction, Request, Response } from 'express';

import env from '../config/env.js';
import { AppError } from '../errors/appErrors.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (env.NODE_ENV === 'development') {
    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}
