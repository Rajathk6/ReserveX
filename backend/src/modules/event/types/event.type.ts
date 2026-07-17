import { z } from 'zod';

import {
  createEventSchema,
  eventFilterSchema,
  eventIdParamSchema,
  paginationSchema,
} from '../validators/event.validator.js';

export type CreateEventDTO = z.infer<typeof createEventSchema>;

export type UpdateEventDTO = Partial<CreateEventDTO>;

export type EventIdParamDTO = z.infer<typeof eventIdParamSchema>;

export type PaginationSchemaDTO = z.infer<typeof paginationSchema>;

export type EventFilterDTO = z.infer<typeof eventFilterSchema>;
