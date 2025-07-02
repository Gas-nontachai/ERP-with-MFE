import { FastifyInstance } from "fastify";
import { menuController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";

const scope = "menus";

export async function menuRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/generateMenuId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    menuController.generateMenuId
  );

  fastify.get(
    `/${scope}`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    menuController.getAllMenus
  );

  fastify.get<{ Params: { menuId: string } }>(
    `/${scope}/:menuId`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    menuController.getMenuById
  );

  fastify.post<{
    Body: { name: string; description: string };
  }>(
    `/${scope}`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "create")],
    },
    menuController.createMenu
  );

  fastify.put<{
    Params: { menuId: string };
    Body: { name: string; description: string };
  }>(
    `/${scope}/:menuId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    menuController.updateMenuById
  );

  fastify.delete<{ Params: { menuId: string } }>(
    `/${scope}/:menuId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "delete")],
    },
    menuController.deleteMenuById
  );
}
