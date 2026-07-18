import { z } from 'zod';

export const venueIdParamSchema = z.object({
  id: z.cuid('Invalid venue id'),
});

export const createVenueSchema = z.object({
  name: z.string().trim().min(3, 'name must be atleast 3 characters long').max(100),
  capacity: z.number().int().positive(),
  vipRows: z.number().int().nonnegative(),
  premiumRows: z.number().int().nonnegative(),
  seatsPerRow: z.number().int().nonnegative(),
  cityId: z.cuid2(),
  isActive: z.boolean().default(true),
});
