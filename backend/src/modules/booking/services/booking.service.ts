import { BookingStatus, EventStatus } from '@prisma/client';
import { AppError } from '../../../errors/appErrors.js';
import { EventRepository } from '../../event/repositories/event.respository.js';
import { SeatRepository } from '../../seat/repositories/seat.repository.js';
import { BookingRepository } from '../repositories/booking.repository.js';
import {
  BookingIdParamDTO,
  CreateBookingDTO,
  EventBookingParamDTO,
} from '../types/booking.type.js';
import { prisma } from '../../../config/database.js';

export class BookingService {
  constructor(
    private readonly bookingRepository = new BookingRepository(),
    private readonly eventRepository = new EventRepository(),
    private readonly seatRepository = new SeatRepository(),
  ) {}

  async createBooking(dto: CreateBookingDTO, eventData: EventBookingParamDTO, userId: string) {
    const event = await this.eventRepository.findById(eventData.eventId);
    if (!event) {
      throw new AppError(404, 'Event Not Found');
    }
    if (event.status !== EventStatus.PUBLISHED) {
      throw new AppError(400, 'Event is not published');
    }

    const seat = await this.seatRepository.getById(event.venueId, dto.seatId);
    if (!seat) {
      throw new AppError(404, 'Seat Not Found');
    }

    if (seat.venueId !== event.venueId) {
      throw new AppError(400, 'Seat does not belong to this event.');
    }

    return prisma.$transaction(async (tx) => {
      const activeBookings = await this.bookingRepository.findActiveBookingForSeat(
        eventData.eventId,
        dto.seatId,
        tx,
      );

      if (activeBookings) {
        throw new AppError(409, 'Seat is already reserved');
      }

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const booking = await this.bookingRepository.create(
        {
          status: BookingStatus.RESERVED,
          expiresAt,
          user: {
            connect: {
              id: userId,
            },
          },
          event: {
            connect: {
              id: eventData.eventId,
            },
          },
          seat: {
            connect: {
              id: dto.seatId,
            },
          },
        },
        tx,
      );
      return booking;
    });
  }

  async getBooking(dto: BookingIdParamDTO) {
    const booking = await this.bookingRepository.findById(dto.bookingId);
    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }
    return booking;
  }

  async getUserBookings(userId: string) {
    return this.bookingRepository.findByUser(userId);
  }

  async cancelBooking(dto: BookingIdParamDTO) {
    const booking = await this.bookingRepository.findById(dto.bookingId);
    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }
    return this.bookingRepository.cancel(dto.bookingId, { status: BookingStatus.CANCELLED });
  }
}
