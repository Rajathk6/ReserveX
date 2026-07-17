import { Prisma } from '@prisma/client';

import { prisma } from '../../../config/database.js';
import { EventFilterDTO } from '../types/event.type.js';

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

  async findAll(dto: EventFilterDTO) {
    const where: Prisma.EventWhereInput = {};

    if (dto.status) {
      where.status = dto.status;
    }

    if (dto.cityId) {
      where.cityId = dto.cityId;
    }

    if (dto.startDate) {
      where.startTime = {
        gte: dto.startDate,
      };
    }

    if (dto.search) {
      where.OR = [
        {
          title: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const skip = (dto.page - 1) * dto.limit;

    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        skip,
        take: dto.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.event.count({
        where,
      }),
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
