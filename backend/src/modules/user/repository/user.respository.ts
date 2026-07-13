import { UserRole } from '@prisma/client';
import { prisma } from '../../../config/database.js';
import { handlePrismaError } from '../../../utils/prismaError.js';

export class UserRepository {
  async findAll() {
    return prisma.user.findMany();
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
      },
    });
  }

  async create(data: { email: string; fullName: string; passwordHash: string; role?: UserRole }) {
    try {
      return prisma.user.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async exists(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
