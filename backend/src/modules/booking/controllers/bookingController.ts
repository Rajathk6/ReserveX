import { Request, Response } from 'express';

import { BookingService } from '../services/booking.service.js';
import {
  BookingIdParamDTO,
  CreateBookingDTO,
  EventBookingParamDTO,
} from '../types/booking.type.js';
import { successResponse } from '../../../utils/apiResponse.js';

export class BookingController {
  constructor(private readonly bookingService = new BookingService()) {}

  async createBooking(req: Request, res: Response) {
    const user = req.user;
    const body = req.body as CreateBookingDTO;
    const eventData = req.params as EventBookingParamDTO;
    const booking = await this.bookingService.createBooking(body, eventData, user!.id);
    return successResponse(res, 'Booking created successfully', booking);
  }

  async getBooking(req: Request<BookingIdParamDTO>, res: Response) {
    const booking = await this.bookingService.getBooking(req.params);
    return successResponse(res, 'Booking fetched successfully', booking);
  }

  async getUserBookings(req: Request, res: Response) {
    const user = req.user;
    const bookings = await this.bookingService.getUserBookings(user!.id);
    return successResponse(res, 'User bookings', bookings);
  }

  async cancelBooking(req: Request<BookingIdParamDTO>, res: Response) {
    const booking = await this.bookingService.cancelBooking(req.params);
    return successResponse(res, 'Booking Cancelled successfully', booking);
  }
}
