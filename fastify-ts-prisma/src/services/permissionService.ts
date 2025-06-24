import { PrismaClient, Permission } from "@prisma/client";

const prisma = new PrismaClient();

export async function generatePermissionId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 24062025
  const prefix = `P${dateStr}`;

  let sequence = 1;
  let permissionId: string;

  while (true) {
    const seqStr = sequence.toString().padStart(3, "0");
    permissionId = `${prefix}${seqStr}`;

    const exists = await prisma.permission.findUnique({
      where: { id: permissionId },
    });

    if (!exists) break;

    sequence++;
  }

  return permissionId;
}

export async function getPermissionById(
  permissionId: string
): Promise<Permission | null> {
  return prisma.permission.findUnique({
    where: { id: permissionId },
  });
}

export async function getAllPermissions(query: any): Promise<Permission[]> {
  return prisma.permission.findMany({ ...query });
}

export async function createPermission(
  permissionId: string,
  name: string,
  description: string,
  addBy: string
): Promise<Permission> {
  const existingPermission = await prisma.permission.findUnique({
    where: { name },
  });
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

export async function deletePermissionById(
  permissionId: string
): Promise<void> {
  await prisma.permission.delete({
    where: { id: permissionId },
  });
}
