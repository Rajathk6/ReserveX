import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Client created');
await prisma.$disconnect();
