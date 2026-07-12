import { prisma } from '../../../config/database.js';

export class RefreshTokenRepository {
  async create(data: { token: string; expiresAt: Date; userId: string }) {
    return prisma.refreshToken.create({
      data,
    });
  }
}
