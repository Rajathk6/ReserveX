import { SeatCategory } from '@prisma/client';
import z from 'zod';

export const seatIdParamSchema = z.object({
  venueId: z.cuid2('Invalid venue id'),
  seatId: z.cuid2('Invalid seat id'),
});

export const seatQuerySchema = z.object({
  category: z.nativeEnum(SeatCategory).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
