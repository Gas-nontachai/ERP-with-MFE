import { FastifyInstance } from "fastify";
import { permissionController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";
import { PermissionInput } from "../types";

const scope = "permissions";

export async function permissionRoutes(fastify: FastifyInstance) {
  fastify.get(
    `/${scope}`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    permissionController.getPermissions
  );

  fastify.put<{
    Body: PermissionInput[];
  }>(
    `/${scope}`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    permissionController.updatePermissionBy
  );
}
