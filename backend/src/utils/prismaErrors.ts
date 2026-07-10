import { Prisma } from '@prisma/client';
import { AppError } from '../errors/app-errors.js';
export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new AppError(409, 'Resource already exists');
      case 'P2025':
        throw new AppError(404, 'Resource not found');
      case 'P2003':
        throw new AppError(400, 'Invalid reference');
      default:
        throw new AppError(500, 'Database operation failed');
    }
  }
  throw error;
}
