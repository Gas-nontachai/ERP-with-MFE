// helper.ts หรือ utils/response.ts
import { FastifyReply } from "fastify";

export function sendSuccess(reply: FastifyReply, data: any, message?: string) {
  reply.send({
    success: true,
    message: message || null,
    data,
  });
}
