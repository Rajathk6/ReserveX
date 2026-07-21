import { BookingStatus, Prisma } from '@prisma/client';
import { prisma } from '../../../config/database.js';

export class BookingRepository {
  async create(data: Prisma.bookingCreateInput, db: Prisma.TransactionClient) {
    return db.booking.create({
      data,
    });
  }

  async findById(bookingId: string, db: Prisma.TransactionClient = prisma) {
    return db.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            venue: {
              select: {
                id: true,
                name: true,
              },
            },
            city: {
              select: {
                id: true,
                name: true,
              },
            },
            organizer: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
        seat: {
          select: {
            id: true,
            number: true,
            category: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string, db: Prisma.TransactionClient = prisma) {
    return db.booking.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findActiveBookingForSeat(
    eventId: string,
    seatId: string,
    db: Prisma.TransactionClient = prisma,
  ) {
    return db.booking.findFirst({
      where: {
        eventId,
        seatId,
        OR: [
          {
            status: BookingStatus.CONFIRMED,
          },
          {
            status: BookingStatus.RESERVED,
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },
    });
  }

  async update(
    bookingId: string,
    data: Prisma.bookingUpdateInput,
    db: Prisma.TransactionClient = prisma,
  ) {
    return db.booking.update({
      where: {
        id: bookingId,
      },
      data,
    });
  }

  async expireReservations(db: Prisma.TransactionClient = prisma) {
    return db.booking.updateMany({
      where: {
        status: BookingStatus.RESERVED,
        expiresAt: {
          lte: new Date(),
        },
      },
      data: {
        status: BookingStatus.EXPIRED,
      },
    });
  }
}
