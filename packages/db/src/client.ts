import { PrismaClient } from './generated/index.js';

// Prisma Client 인스턴스를 전역으로 관리 (개발 모드 hot reload 대응)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
