import { z } from 'zod';

export const bookingIdParamSchema = z.object({
  bookingId: z.cuid2(),
});

export const eventBookingParamschema = z.object({
  eventId: z.cuid2(),
});

export const createBookingSchema = z.object({
  seatId: z.cuid2(),
});
