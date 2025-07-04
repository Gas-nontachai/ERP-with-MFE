import { FastifyInstance } from "fastify";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    const statusCode = (error as any).statusCode || 500;

    reply.status(statusCode).send({
      success: false,
      error: {
        name: error.name,
        message: error.message,
        statusCode,
      },
    });
  });
}
