import { createVenueSchema, venueIdParamSchema } from '../validators/venue.validator.js';
import { z } from 'zod';

export type CreateVenueDTO = z.infer<typeof createVenueSchema>;

export type VenueIdParamDTO = z.infer<typeof venueIdParamSchema>;

export type UpdateVenueDTO = Partial<CreateVenueDTO>;
