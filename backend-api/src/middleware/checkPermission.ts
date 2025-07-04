import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../errors";

const prisma = new PrismaClient();

// Define a User type with userId property
type AuthUser = {
  userId: string;
  [key: string]: any;
};

/**
 * Middleware ตรวจสอบสิทธิ์การเข้าถึง route
 * @param menuName - ชื่อ menu เช่น 'user', 'role'
 * @param action - ประเภทการกระทำ เช่น 'view', 'create', 'update', 'delete'
 */
export function checkPermission(
  menuName: string,
  action: "view" | "create" | "update" | "delete"
) {
  return async function (request: FastifyRequest, _reply: FastifyReply) {
    const authUser = request.user as AuthUser;

    if (!authUser) {
      throw new BadRequestError("Unauthorized");
    }

    const userWithRole = await prisma.user.findUnique({
      where: { userId: authUser.user.userId },
      include: {
        role: {
          include: {
            permissions: {
              where: {
                menu: { name: menuName },
              },
              include: {
                menu: true,
              },
            },
          },
        },
      },
    });

    if (!userWithRole?.role?.permissions?.length) {
      throw new BadRequestError("No permission for this module");
    }

    const rp = userWithRole.role.permissions[0];

    if (!rp[action]) {
      throw new BadRequestError(`Permission denied: ${action}`);
    }
  };
}
