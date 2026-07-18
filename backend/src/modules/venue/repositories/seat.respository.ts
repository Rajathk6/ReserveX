import { Prisma } from '@prisma/client';

import { prisma } from '../../../config/database.js';

export class GenerateSeatRepository {
  async createManySeats(
    seats: Prisma.SeatCreateManyInput[],
    tx: Prisma.TransactionClient = prisma,
  ) {
    return tx.seat.createMany({
      data: seats,
    });
  }
}
