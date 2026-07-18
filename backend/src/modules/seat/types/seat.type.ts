import z from 'zod';

import { seatIdParamSchema, seatQuerySchema } from '../validators/seat.validator.js';

export type SeatIdParamDTO = z.infer<typeof seatIdParamSchema>;

export type SeatFilterDTO = z.infer<typeof seatQuerySchema>;
