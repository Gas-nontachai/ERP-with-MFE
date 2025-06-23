import { PrismaClient, Permission } from "@prisma/client";

const prisma = new PrismaClient();

export async function generatePermissionId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 23062025

  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const permissionsTodayCount = await prisma.permission.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const sequence = (permissionsTodayCount + 1).toString().padStart(3, "0"); // เช่น 001
  const permissionId = `R${dateStr}${sequence}`;
  return permissionId;
}

export async function getPermissionById(permissionId: string): Promise<Permission | null> {
  return prisma.permission.findUnique({
    where: { id: permissionId },
  });
}

export async function getAllPermissions(): Promise<Permission[]> {
  return prisma.permission.findMany();
}

export async function createPermission(
  permissionId: string,
  name: string,
  description: string,
  addBy: string
): Promise<Permission> {
  const existingPermission = await prisma.permission.findUnique({ where: { name } });
  if (existingPermission) {
    throw new Error("Permission already in use");
  }

  return prisma.permission.create({
    data: { id: permissionId, name, description, addBy },
  });
}

export async function updatePermissionById(
  permissionId: string,
  data: {
    name?: string;
    description?: string;
    updateBy?: string;
    updatedAt?: Date;
  }
): Promise<Permission> {
  return prisma.permission.update({
    where: { id: permissionId },
    data,
  });
}

export async function deletePermissionById(permissionId: string): Promise<void> {
  await prisma.permission.delete({
    where: { id: permissionId },
  });
}
