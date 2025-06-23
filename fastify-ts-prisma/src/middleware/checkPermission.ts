import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Middleware ตรวจสอบสิทธิ์การเข้าถึง route
 * @param permissionName - ชื่อ permission เช่น 'user'
 * @param action - ประเภทการกระทำ เช่น 'view', 'create', 'update', 'delete'
 */
// Define a User type with userId property
type AuthUser = {
  userId: string;
  [key: string]: any;
};

export function checkPermission(
  permissionName: string,
  action: "view" | "create" | "update" | "delete"
) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as AuthUser; // ได้มาจาก fastify.authenticate
    if (!user) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const userWithRole = await prisma.user.findUnique({
      where: { userId: user.userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              where: {
                permission: { name: permissionName },
              },
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!userWithRole?.role?.rolePermissions?.length) {
      return reply.status(403).send({ error: "No permission for this module" });
    }

    type RolePermissionWithActions =
      (typeof userWithRole.role.rolePermissions)[0] & {
        view?: boolean;
        create?: boolean;
        update?: boolean;
        delete?: boolean;
      };

    const rp = userWithRole.role
      .rolePermissions[0] as RolePermissionWithActions;

    if (!rp[action]) {
      return reply.status(403).send({ error: `Permission denied: ${action}` });
    }
  };
}
