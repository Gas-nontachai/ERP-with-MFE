import { FastifyInstance } from "fastify";
import { permissionController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";

const scope = "permission";

export async function permissionRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/generatePermissionId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    permissionController.generatePermissionId
  );

  fastify.get(
    "/permissions",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    permissionController.getAllPermissions
  );

  fastify.get<{ Params: { permissionId: string } }>(
    "/permissions/:permissionId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    permissionController.getPermissionById
  );

  fastify.post<{
    Body: { name: string; description: string };
  }>(
    "/permissions",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "create")],
    },
    permissionController.createPermission
  );

  fastify.put<{
    Params: { permissionId: string };
    Body: { name: string; description: string };
  }>(
    "/permissions/:permissionId",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    permissionController.updatePermissionById
  );

  fastify.delete<{ Params: { permissionId: string } }>(
    "/permissions/:permissionId",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "delete")],
    },
    permissionController.deletePermissionById
  );
}
