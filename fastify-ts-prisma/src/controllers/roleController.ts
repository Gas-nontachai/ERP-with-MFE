import { FastifyRequest, FastifyReply } from "fastify";
import { roleService } from "../services";

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
  const roles = await roleService.getAllRoles();
  reply.send(roles);
}

export async function getRoleById(
  request: FastifyRequest<{ Params: { roleId: string } }>,
  reply: FastifyReply
) {
  const roleId = request.params.roleId;
  const role = await roleService.getRoleById(roleId);
  if (!role) {
    return reply.status(404).send({ error: "Role not found" });
  }
  reply.send(role);
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
  try {
    const role = await roleService.createRole(roleId, name, description, addBy);
    reply.code(201).send(role);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
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
  try {
    const updatedRole = await roleService.updateRoleById(roleId, {
      name,
      description,
      updateBy,
      updatedAt: new Date(),
    });
    reply.send(updatedRole);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}

export async function deleteRoleById(
  request: FastifyRequest<{ Params: { roleId: string } }>,
  reply: FastifyReply
) {
  const roleId = request.params.roleId;
  try {
    await roleService.deleteRoleById(roleId);
    reply.code(204).send();
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}
