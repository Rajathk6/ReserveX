import { CookieOptions } from 'express';
import env from './env.js';
import ms, { type StringValue } from 'ms';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/api/v1/auth',
  secure: env.NODE_ENV === 'production',
  maxAge: ms(env.JWT_ACCESS_EXPIRES_IN as StringValue),
};
