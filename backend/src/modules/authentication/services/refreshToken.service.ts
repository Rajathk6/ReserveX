import crypto from 'crypto';

export class RefreshTokenService {
  generateRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
  }
}
