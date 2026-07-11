import jwt from 'jsonwebtoken';
import env from '../../../config/env.js';
import { StringValue } from 'ms';

export class JwtService {
  generateAccessToken(userId: string, role: string) {
    return jwt.sign({ role }, env.JWT_ACCESS_SECRET, {
      subject: userId,
      expiresIn: env.JWT_ACCESS_EXPIRES_IN as StringValue,
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  }
}
