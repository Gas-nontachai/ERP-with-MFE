import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function generateUserId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 23062025
  const prefix = `U${dateStr}`;

  let sequence = 1;
  let userId: string;

  while (true) {
    const seqStr = sequence.toString().padStart(3, "0");
    userId = `${prefix}${seqStr}`;

    const exists = await prisma.user.findUnique({
      where: { userId }, // ต้องมั่นใจว่า userId เป็น unique key
    });

    if (!exists) break;

    sequence++;
  }

  return userId;
}

export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { userId },
    include: { role: true },
  });
}

export async function getAllUsers(query: any): Promise<User[]> {
  return prisma.user.findMany({
    ...query,
    include: { role: true },
  });
}

export async function createUser(
  userId: string,
  email: string,
  password: string,
  name: string,
  roleId: string
): Promise<User> {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { userId, email, password: hashedPassword, name, roleId },
  });
}

export async function updateUserById(
  userId: string,
  data: { name?: string; roleId?: string; updatedAt?: Date } = {}
): Promise<User> {
  return prisma.user.update({
    where: { userId },
    data,
  });
}

export async function deleteUserById(userId: string): Promise<void> {
  await prisma.user.delete({
    where: { userId },
  });
}
