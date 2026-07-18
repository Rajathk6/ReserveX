import { Prisma } from '@prisma/client';
import { prisma } from '../../../config/database.js';
import { SeatFilterDTO } from '../types/seat.type.js';

export class SeatRepository {
  async getByVenue(venueId: string, dto: SeatFilterDTO) {
    const where: Prisma.SeatWhereInput = { venueId };
    if (dto.category) {
      where.category = dto.category;
    }

    const skip = (dto.page - 1) * dto.limit;
    const take = dto.limit;

    const [seats, total] = await prisma.$transaction([
      prisma.seat.findMany({
        where,
        skip,
        take,
        orderBy: [
          {
            row: 'asc',
          },
          {
            number: 'asc',
          },
        ],
      }),

      prisma.seat.count({
        where,
      }),
    ]);

    return {
      seats,
      total,
    };
  }

  async getById(venueId: string, seatId: string) {
    return prisma.seat.findFirst({
      where: {
        id: seatId,
        venueId,
      },
    });
  }
}
