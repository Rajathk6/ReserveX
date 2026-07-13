import crypto from 'crypto';

export function generateRefreshToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateRefreshTokenHash(refreshToken: string) {
  return crypto.createHash('sha256').update(refreshToken).digest('hex');
}
