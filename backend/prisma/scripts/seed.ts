import { prisma } from '../../src/config/database.js';
import logger from '../../src/config/logger.js';
import { handlePrismaError } from '../../src/utils/prismaError.js';
import { hashPassword } from '../../src/modules/authentication/utils/password.js';

const hash = await hashPassword('admin@123');

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'admin@reservex.dev',
    },
    update: {},
    create: {
      email: 'admin@reservex.dev',
      fullName: 'ReserveX Administrator',
      passwordHash: hash,
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
