import { Prisma } from '@prisma/client';

import { prisma } from '../../../config/database.js';

export class VenueRepository {
  async findAll() {
    return prisma.venue.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.venue.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.VenueCreateInput, tx: Prisma.TransactionClient = prisma) {
    return tx.venue.create({
      data,
    });
  }

  async update(id: string, data: Prisma.VenueUpdateInput) {
    return prisma.venue.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.venue.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
