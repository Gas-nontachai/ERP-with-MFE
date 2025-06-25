import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateRoleId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 24062025
  const prefix = `R${dateStr}`;

  let sequence = 1;
  let roleId: string;

  while (true) {
    const seqStr = sequence.toString().padStart(3, "0");
    roleId = `${prefix}${seqStr}`;

    const exists = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!exists) break;

    sequence++;
  }

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
