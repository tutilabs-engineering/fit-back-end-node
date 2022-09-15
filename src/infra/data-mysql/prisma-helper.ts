import { Prisma, PrismaClient } from '@prisma/client'
export const PrismaHelper = {
  Prisma,
  prisma: new PrismaClient(),
}
