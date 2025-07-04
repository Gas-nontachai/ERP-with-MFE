import { FastifyRequest, FastifyReply } from "fastify";
import { roleService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { NotFoundError } from "../errors/";
import { sendSuccess } from "../utils/response";

export async function generateRoleId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const roleId = await roleService.generateRoleId();
  reply.send({ roleId });
}

export async function getAllRoles(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const roles = await roleService.getAllRoles(query);
  sendSuccess(reply, roles, "Get Role successfully");
}

export async function getRoleById(
  request: FastifyRequest<{ Params: { roleId: string } }>,
  reply: FastifyReply
) {
  const roleId = request.params.roleId;
  const role = await roleService.getRoleById(roleId);
  if (!role) {
    throw new NotFoundError("Role not found");
  }
  sendSuccess(reply, role, "Get Role successfully");
}

export async function createRole(
  request: FastifyRequest<{
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const roleId = await roleService.generateRoleId();
  const { name, description } = request.body;
  const addBy = (request.user as any).userId;
  const role = await roleService.createRole(roleId, name, description, addBy);
  sendSuccess(reply, role, "Create Role successfully");
}

export async function updateRoleById(
  request: FastifyRequest<{
    Params: { roleId: string };
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const roleId = request.params.roleId;
  const { name, description } = request.body;
  const updateBy = (request.user as any).userId;
  const updatedRole = await roleService.updateRoleById(roleId, {
    name,
    description,
    updateBy,
    updatedAt: new Date(),
  });
  sendSuccess(reply, updatedRole, "Update Role successfully");
}

export async function deleteRoleById(
  request: FastifyRequest<{ Params: { roleId: string } }>,
  reply: FastifyReply
) {
  const roleId = request.params.roleId;
  await roleService.deleteRoleById(roleId);
  sendSuccess(reply, { delete: true }, "Delete Role successfully");
}
