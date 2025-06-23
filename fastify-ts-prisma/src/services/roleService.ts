import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateRoleId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 23062025

  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const rolesTodayCount = await prisma.role.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const sequence = (rolesTodayCount + 1).toString().padStart(3, "0"); // เช่น 001
  const roleId = `R${dateStr}${sequence}`;
  return roleId;
}

export async function getRoleById(roleId: string): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { id: roleId },
  });
}

export async function getAllRoles(query: any): Promise<Role[]> {
  return prisma.role.findMany({ ...query });
}

export async function createRole(
  roleId: string,
  name: string,
  description: string,
  addBy: string
): Promise<Role> {
  const existingRole = await prisma.role.findUnique({ where: { name } });
  if (existingRole) {
    throw new Error("Role already in use");
  }

  return prisma.role.create({
    data: { id: roleId, name, description, addBy },
  });
}

export async function updateRoleById(
  roleId: string,
  data: {
    name?: string;
    description?: string;
    updateBy?: string;
    updatedAt?: Date;
  }
): Promise<Role> {
  return prisma.role.update({
    where: { id: roleId },
    data,
  });
}

export async function deleteRoleById(roleId: string): Promise<void> {
  await prisma.role.delete({
    where: { id: roleId },
  });
}
