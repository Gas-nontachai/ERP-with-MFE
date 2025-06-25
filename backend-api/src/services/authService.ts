import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
// สร้าง user ใหม่ (hash password ก่อนบันทึก)
export async function registerUser(
  userId: string,
  email: string,
  password: string,
  name: string,
  roleId: string
): Promise<User> {
  // เช็คว่ามี email นี้อยู่แล้วไหม
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // hash รหัสผ่าน
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
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(userId: string) {
  return prisma.user.findUnique({ where: { userId }, include: { role: true } });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
