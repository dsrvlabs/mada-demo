import type { PrismaClient } from "@prisma/client";

export declare global {
  namespace globalThis {
    const prisma: PrismaClient | undefined;
  }
}
