import { z } from 'zod';
import { createEventSchema, eventIdParamSchema } from '../validators/event.validator.js';

export type CreateEventDTO = z.infer<typeof createEventSchema>;

export type UpdateEventDTO = Partial<CreateEventDTO>;

export type eventIdParam = z.infer<typeof eventIdParamSchema>;
