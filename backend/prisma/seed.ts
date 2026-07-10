import { prisma } from '../src/config/database.js';
import logger from '../src/config/logger.js';

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'admin@reservex.dev',
    },
    update: {},
    create: {
      email: 'admin@reservex.dev',
      fullName: 'ReserveX Administrator',
    },
  });
  logger.info('Seed data created successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
