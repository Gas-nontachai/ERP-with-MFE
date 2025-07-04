import { FastifyRequest, FastifyReply } from "fastify";
import { permissionService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { PermissionInput } from "../types";
import { sendSuccess } from "../utils/response";

export async function getPermissions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const permissions = await permissionService.getPermissions(query);
  sendSuccess(reply, permissions, "Get Permissions successfully");
}
export async function updatePermissionBy(
  request: FastifyRequest<{ Body: PermissionInput[] }>,
  reply: FastifyReply
) {
  const permissions = request.body;
  const updateBy = (request.user as any).userId;

  await permissionService.updatePermissionBy(permissions, updateBy);
  sendSuccess(reply, { success: true }, "Update Permissions successfully");
}
