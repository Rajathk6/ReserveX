import { EventStatus } from '@prisma/client';
import { z } from 'zod';

export const eventIdParamSchema = z.object({
  id: z.cuid('Invalid event id'),
});

export const createEventSchema = z.object({
  title: z.string().trim().min(3, 'title must be atleast 3 characters long').max(100),
  description: z.string().trim().min(3, 'description must be atleast 3 characters long').max(1000),
  startTime: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Start time must be in the future',
  }),
  endTime: z.coerce.date().refine((date) => date > new Date(), {
    message: 'End time must be in the future',
  }),
  cityId: z.cuid2(),
  venueId: z.cuid2(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const eventFilterSchema = paginationSchema.extend({
  status: z.nativeEnum(EventStatus).optional(),
  cityId: z.cuid2().optional(),
  startDate: z.coerce.date().optional(),
  search: z.string().trim().min(2).max(100).optional(),
});
