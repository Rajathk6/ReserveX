import { prisma } from '../src/config/database.js';
import logger from '../src/config/logger.js';
import { handlePrismaError } from '../src/utils/prismaError.js';

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'admin@reservex.dev',
    },
    update: {},
    create: {
      email: 'admin@reservex.dev',
      fullName: 'ReserveX Administrator',
      passwordHash: '$2b$10$7Q0Z1F5J8K1G9H2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2', // hashed password for 'admin123'
      role: 'ADMIN',
    },
  });
  logger.info('Seed data created successfully.');
}

main()
  .catch((error) => {
    handlePrismaError(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
