import { FastifyRequest } from "fastify";

export function logRequest(request: FastifyRequest) {
  const { method, url } = request;
  const timestamp = new Date().toISOString();
  const user = (request.user as any)?.user.userId
    ? `(userId: ${(request.user as any).user.userId})`
    : "(unauthenticated)";
  console.log(`[${timestamp}] ${method} ${url} ${user} `);
}
