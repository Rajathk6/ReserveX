import { prisma } from '../../../config/database.js';

export class RefreshTokenRepository {
  async create(data: { tokenHash: string; expiresAt: Date; userId: string }) {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findByTokenHash(tokenHash: string) {
    return prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }
}
