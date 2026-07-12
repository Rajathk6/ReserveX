import crypto from 'crypto';
import ms from 'ms';

import env from '../../../config/env.js';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository.js';
import { AppError } from '../../../errors/appErrors.js';
import { JwtService } from './jwt.service.js';

export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository = new RefreshTokenRepository(),
    private readonly jwtService = new JwtService(),
  ) {}

  async refreshTokenRotation(refreshToken: string) {
    const token = await this.refreshTokenRepository.findByTokenHash(refreshToken);
    if (!token) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const isTokenExpired = token.expiresAt < new Date();
    if (isTokenExpired) {
      throw new AppError(401, 'Refresh token expired');
    }

    await this.refreshTokenRepository.delete(token.id);

    const newRefreshToken = this.generateRefreshTokenHash();

    await this.refreshTokenRepository.create({
      tokenHash: newRefreshToken,
      userId: token.user.id,
      expiresAt: new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue)),
    });

    return {
      accessToken: this.jwtService.generateAccessToken(token.user.id, token.user.role),
      refreshToken: newRefreshToken,
    };
  }

  generateRefreshTokenHash() {
    return crypto.createHash('sha256').update(crypto.randomBytes(128)).digest('hex');
  }
}
