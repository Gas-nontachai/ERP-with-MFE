import { FastifyInstance } from "fastify";
import { authRoutes } from "./authRoutes";
import { categoryRoutes } from "./categoryRoutes";
import { menuRoutes } from "./menuRoutes";
import { permissionRoutes } from "./permissionRoutes";
import { roleRoutes } from "./roleRoutes";
import { userRoutes } from "./userRoutes";

export async function routes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    return `Congratulations! Your Fastify server ${process.env.PORT} is running.`;
  });

  // Register routes with /api prefix
  fastify.register(
    async (apiScope) => {
      await authRoutes(apiScope);
      await categoryRoutes(apiScope);
      await menuRoutes(apiScope);
      await permissionRoutes(apiScope);
      await roleRoutes(apiScope);
      await userRoutes(apiScope);
    },
    { prefix: "/api" }
  );
}
