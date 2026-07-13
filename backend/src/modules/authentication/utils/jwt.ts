import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

import env from '../../../config/env.js';
import { JwtPayload } from '../types/jwtPayload.js';
import { AppError } from '../../../errors/appErrors.js';

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign({ role }, env.JWT_ACCESS_SECRET, {
    subject: userId,
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as StringValue,
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
  } catch {
    throw new AppError(401, 'Invalid or expired token, please login');
  }
}
