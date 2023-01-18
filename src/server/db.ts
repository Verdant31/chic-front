import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      (env as any).NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if ((env as any) !== "production") {
  global.prisma = prisma;
}
