import { z } from 'zod';

export const eventIdParamSchema = z.object({
  id: z.cuid('Invalid event id'),
});
