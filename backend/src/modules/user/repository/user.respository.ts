import { prisma } from '../../../config/database.js';

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
    });
  }

  async create(data: { email: string; fullName: string }) {
    return prisma.user.create({
      data,
    });
  }
}
