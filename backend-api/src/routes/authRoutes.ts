import { FastifyInstance } from "fastify";
import { authController } from "../controllers";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", authController.register);
  fastify.post("/login", async (request, reply) =>
    authController.login(request, reply, fastify)
  );
  fastify.get(
    "/getMe",
    { preValidation: [fastify.authenticate] },
    authController.getMe
  );
}
