import { FastifyRequest, FastifyReply } from "fastify";
import { permissionService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { PermissionInput } from "../types";

export async function getPermissions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const permissions = await permissionService.getPermissions(query);
  reply.send(permissions);
}
export async function updatePermissionBy(
  request: FastifyRequest<{ Body: PermissionInput[] }>,
  reply: FastifyReply
) {
  const permissions = request.body;
  const updateBy = (request.user as any).userId;

  try {
    await permissionService.updatePermissionBy(permissions, updateBy);

    reply.send({ success: true });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}
