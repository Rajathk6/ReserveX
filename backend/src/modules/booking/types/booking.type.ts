import { z } from 'zod';

import {
  bookingIdParamSchema,
  createBookingSchema,
  eventBookingParamschema,
} from '../validators/booking.validator.js';

export type CreateBookingDTO = z.infer<typeof createBookingSchema>;

export type EventBookingParamDTO = z.infer<typeof eventBookingParamschema>;

export type BookingIdParamDTO = z.infer<typeof bookingIdParamSchema>;

export type UpdateBookingDTO = Partial<CreateBookingDTO>;
