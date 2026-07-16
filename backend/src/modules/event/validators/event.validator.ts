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
  capacity: z.number().int().positive(),
  venue: z.string().trim(),
  cityId: z.cuid(),
});
