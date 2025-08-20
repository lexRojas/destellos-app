import { PrismaClient } from "@prisma/client";

// En un entorno de desarrollo, `global` se ve afectado por la recarga en caliente de Next.js,
// lo que puede llevar a crear nuevas instancias de PrismaClient en cada recarga.
// Almacenamos la instancia en `global` para preservarla entre recargas.

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
