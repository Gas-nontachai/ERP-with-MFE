import { PrismaClient, Permission } from "@prisma/client";

import { PermissionInput } from "../types";
const prisma = new PrismaClient();

export async function getPermissions(query: any): Promise<Permission[]> {
  return prisma.permission.findMany({ ...query });
}

export async function updatePermissionBy(
  permissions: PermissionInput[],
  userId?: string
): Promise<void> {
  await prisma.$transaction(
    permissions.map((perm) =>
      prisma.permission.upsert({
        where: {
          roleId_menuId: {
            roleId: perm.roleId,
            menuId: perm.menuId,
          },
        },
        create: {
          roleId: perm.roleId,
          menuId: perm.menuId,
          view: perm.view,
          create: perm.create,
          update: perm.update,
          delete: perm.delete,
          addBy: userId,
          createdAt: new Date(),
        },
        update: {
          view: perm.view,
          create: perm.create,
          update: perm.update,
          delete: perm.delete,
          updateBy: userId,
          updatedAt: new Date(),
        },
      })
    )
  );
}
