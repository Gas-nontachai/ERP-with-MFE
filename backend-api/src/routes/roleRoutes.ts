import { FastifyInstance } from "fastify";
import { roleController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";

const scope = "roles";

export async function roleRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/generateRoleId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    roleController.generateRoleId
  );

  fastify.get(
    `/${scope}`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    roleController.getAllRoles
  );

  fastify.get<{ Params: { roleId: string } }>(
    `/${scope}/:roleId`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    roleController.getRoleById
  );

  fastify.post<{
    Body: { name: string; description: string };
  }>(
    `/${scope}`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "create")],
    },
    roleController.createRole
  );

  fastify.put<{
    Params: { roleId: string };
    Body: { name: string; description: string };
  }>(
    `/${scope}/:roleId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    roleController.updateRoleById
  );

  fastify.delete<{ Params: { roleId: string } }>(
    `/${scope}/:roleId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "delete")],
    },
    roleController.deleteRoleById
  );
}
