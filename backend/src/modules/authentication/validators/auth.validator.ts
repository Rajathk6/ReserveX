import { z } from 'zod';

// registeration validator
export const registerSchema = z.object({
  fullName: z.string().trim().min(3, 'name must be atleast 3 characters long').max(100),
  email: z.email().trim().toLowerCase(),
  password: z.string().trim().min(8, 'password must be 8 characters long').max(72),
});

// login validator
export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().trim().min(1, 'password is required'),
});
