import { FastifyRequest, FastifyReply } from "fastify";
import { permissionService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";

export async function generatePermissionId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const permissionId = await permissionService.generatePermissionId();
  reply.send({ permissionId });
}

export async function getAllPermissions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const permissions = await permissionService.getAllPermissions(query);
  reply.send(permissions);
}

export async function getPermissionById(
  request: FastifyRequest<{ Params: { permissionId: string } }>,
  reply: FastifyReply
) {
  const permissionId = request.params.permissionId;
  const permission = await permissionService.getPermissionById(permissionId);
  if (!permission) {
    return reply.status(404).send({ error: "Permission not found" });
  }
  reply.send(permission);
}

export async function createPermission(
  request: FastifyRequest<{
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const permissionId = await permissionService.generatePermissionId();
  const { name, description } = request.body;
  const addBy = (request.user as any).userId;
  try {
    const permission = await permissionService.createPermission(
      permissionId,
      name,
      description,
      addBy
    );
    reply.code(201).send(permission);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}

export async function updatePermissionById(
  request: FastifyRequest<{
    Params: { permissionId: string };
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const permissionId = request.params.permissionId;
  const { name, description } = request.body;
  const updateBy = (request.user as any).userId;
  try {
    const updatedPermission = await permissionService.updatePermissionById(
      permissionId,
      {
        name,
        description,
        updateBy,
        updatedAt: new Date(),
      }
    );
    reply.send(updatedPermission);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}

export async function deletePermissionById(
  request: FastifyRequest<{ Params: { permissionId: string } }>,
  reply: FastifyReply
) {
  const permissionId = request.params.permissionId;
  try {
    await permissionService.deletePermissionById(permissionId);
    reply.code(204).send();
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}
