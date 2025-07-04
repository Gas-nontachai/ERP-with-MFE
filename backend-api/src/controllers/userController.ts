import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { NotFoundError } from "../errors/";
import { sendSuccess } from "../utils/response";

export async function generateUserId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = await userService.generateUserId();
  reply.send({ userId });
}

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const users = await userService.getAllUsers(query);
  sendSuccess(reply, users, "Get User successfully");
}

export async function getUserById(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const userId = request.params.userId;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  sendSuccess(reply, user, "Get User successfully");
}

export async function createUser(
  request: FastifyRequest<{
    Body: { email: string; password: string; name: string; roleId: string };
  }>,
  reply: FastifyReply
) {
  const userId = await userService.generateUserId();
  const { email, password, name, roleId } = request.body;
  const user = await userService.createUser(
    userId,
    email,
    password,
    name,
    roleId
  );
  sendSuccess(reply, user, "Create User successfully");
}

export async function updateUserById(
  request: FastifyRequest<{
    Params: { userId: string };
    Body: { name?: string; roleId?: string };
  }>,
  reply: FastifyReply
) {
  const userId = request.params.userId;
  const { name, roleId } = request.body;
  const updatedUser = await userService.updateUserById(userId, {
    name,
    roleId,
    updatedAt: new Date(),
  });
  sendSuccess(reply, updatedUser, "Update User successfully");
}

export async function deleteUserById(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const userId = request.params.userId;
  await userService.deleteUserById(userId);
  sendSuccess(reply, { delete: true }, "Delete User successfully");
}
