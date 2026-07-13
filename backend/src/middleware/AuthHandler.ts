import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../modules/authentication/services/jwt.service.js';
import { AppError } from '../errors/appErrors.js';

const jwtService = new JwtService();

export async function authHandler(req: Request, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new AppError(401, 'Authentication Required');
  }

  const token = auth.split(' ')[1];
  const payload = jwtService.verifyAccessToken(token);

  req.user = {
    id: payload.sub,
    role: payload.role,
  };

  next();
}
