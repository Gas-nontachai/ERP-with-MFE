import { FastifyRequest } from "fastify";

export function logRequest(request: FastifyRequest) {
  const { method, url } = request;
  const timestamp = new Date().toISOString();
  const user = (request.user as any)?.userId
    ? `(userId: ${(request.user as any).userId})`
    : "(unauthenticated)";
  console.log(`[${timestamp}] ${method} ${url} ${user} `);
}
