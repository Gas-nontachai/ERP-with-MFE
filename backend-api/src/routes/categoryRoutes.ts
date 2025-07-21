import { FastifyInstance } from "fastify";
import { categoryController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";

const scope = "categorys";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/generateCategoryId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    categoryController.generateCategoryId
  );

  fastify.get(
    `/${scope}`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    categoryController.getAllCategorys
  );

  fastify.get<{ Params: { categoryId: string } }>(
    `/${scope}/:categoryId`,
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    categoryController.getCategoryById
  );

  fastify.post<{
    Body: { name: string; description: string };
  }>(
    `/${scope}`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "create")],
    },
    categoryController.createCategory
  );

  fastify.put<{
    Params: { categoryId: string };
    Body: { name: string; description: string };
  }>(
    `/${scope}/:categoryId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    categoryController.updateCategoryById
  );

  fastify.delete<{ Params: { categoryId: string } }>(
    `/${scope}/:categoryId`,
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "delete")],
    },
    categoryController.deleteCategoryById
  );
}
