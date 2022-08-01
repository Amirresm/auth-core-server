import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
}
export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.log(error);
  }
}

export default prisma;
