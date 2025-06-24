import { FastifyInstance } from "fastify";
import { authRoutes } from "./authRoutes";
import { menuRoutes } from "./menuRoutes";
import { roleRoutes } from "./roleRoutes";
import { userRoutes } from "./userRoutes";

export async function routes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async () =>
      `Congratulations! Your Fastify server ${process.env.PORT} is running.`
  );
  // เรียกใช้ route module ต่างๆ ที่นี่
  await authRoutes(fastify);
  await menuRoutes(fastify);
  await roleRoutes(fastify);
  await userRoutes(fastify);
}
