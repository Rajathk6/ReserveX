import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../modules/authentication/utils/jwt.js';
import { AppError } from '../errors/appErrors.js';
import { UserRole } from '@prisma/client';

export function authenticationHandler(req: Request, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new AppError(401, 'Authentication Required');
  }

  const token = auth.split(' ')[1];
  const payload = verifyAccessToken(token);

  req.user = {
    id: payload.sub,
    role: payload.role,
  };

  next();
}

export function authorizationHandler(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, 'Authentication Required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(403, 'Forbidden, Access Denied');
    }
    next();
  };
}
