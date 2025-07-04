import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function registerUser(
  userId: string,
  email: string,
  password: string,
  name: string,
  roleId: string
): Promise<User> {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      userId,
      email,
      password: hashedPassword,
      name,
      roleId,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email }, include: { role: true } });
}

export async function findUserById(userId: string) {
  return prisma.user.findUnique({ where: { userId }, include: { role: true } });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
