import ms from 'ms';

import env from '../../../config/env.js';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository.js';
import { AppError } from '../../../errors/appErrors.js';
import { generateAccessToken } from '../utils/jwt.js';
import { generateRefreshToken, generateRefreshTokenHash } from '../utils/refreshToken.js';

export class RefreshTokenService {
  constructor(private readonly refreshTokenRepository = new RefreshTokenRepository()) {}

  async refreshTokenRotation(refreshToken: string) {
    const refreshTokenHash = generateRefreshTokenHash(refreshToken);
    const token = await this.refreshTokenRepository.findByTokenHash(refreshTokenHash);
    if (!token) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const isTokenExpired = token.expiresAt < new Date();
    if (isTokenExpired) {
      throw new AppError(401, 'Refresh token expired');
    }

    await this.refreshTokenRepository.delete(token.id);

    const newRefreshToken = generateRefreshToken();

    const newRefreshTokenHash = generateRefreshTokenHash(newRefreshToken);

    await this.refreshTokenRepository.create({
      tokenHash: newRefreshTokenHash,
      userId: token.user.id,
      expiresAt: new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue)),
    });

    return {
      accessToken: generateAccessToken(token.user.id, token.user.role),
      refreshToken: newRefreshToken,
    };
  }
}
