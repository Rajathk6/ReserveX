import { EventStatus } from '@prisma/client';

import { prisma } from '../../../config/database.js';

export class EventStatusRepository {
  async updateStatus(id: string, status: EventStatus) {
    return prisma.event.update({
      where: {
        id,
      },
      data: {
        status,
      },
      select: {
        id: true,
        status: true,
        title: true,
        venue: true,
        city: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            fullName: true,
          },
        },
      },
    });
  }
}
