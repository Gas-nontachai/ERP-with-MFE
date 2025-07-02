import { FastifyRequest, FastifyReply } from "fastify";

export function logRequest(request: FastifyRequest, reply: FastifyReply) {
  const { method, url } = request;
  const timestamp = new Date().toISOString();
  const statusCode = reply.statusCode;
  const user = (request.user as any)?.userId
    ? `(userId: ${(request.user as any).userId})`
    : "(unauthenticated)";
  console.log(`[${timestamp}] ${method} ${url} ${user} → ${statusCode}`);
}
