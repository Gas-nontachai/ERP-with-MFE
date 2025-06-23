import { FastifyInstance } from "fastify";
import { userController } from "../controllers";
import { checkPermission } from "../middleware/checkPermission";

const scope = "user";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/generateUserId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    userController.generateUserId
  );

  fastify.get(
    "/users",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    userController.getAllUsers
  );

  fastify.get<{ Params: { userId: string } }>(
    "/users/:userId",
    { preValidation: [fastify.authenticate, checkPermission(scope, "view")] },
    userController.getUserById
  );

  fastify.post<{
    Body: { email: string; password: string; name: string; roleId: string };
  }>(
    "/users",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "create")],
    },
    userController.createUser
  );

  fastify.put<{
    Params: { userId: string };
    Body: { name?: string; roleId?: string };
  }>(
    "/users/:userId",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "update")],
    },
    userController.updateUserById
  );

  fastify.delete<{ Params: { userId: string } }>(
    "/users/:userId",
    {
      preValidation: [fastify.authenticate, checkPermission(scope, "delete")],
    },
    userController.deleteUserById
  );
}
