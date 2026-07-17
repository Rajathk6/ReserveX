import { z } from 'zod';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

export type LoginDTO = z.infer<typeof loginSchema>;

export type RegisterDTO = z.infer<typeof registerSchema>;
