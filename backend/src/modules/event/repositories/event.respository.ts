import { Prisma } from '@prisma/client';
import { prisma } from '../../../config/database.js';

export class EventRepository {
  async create(data: Prisma.EventCreateInput) {
    return prisma.event.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(page: number, limit: number) {
    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.event.count(),
    ]);

    return {
      events,
      total,
    };
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
