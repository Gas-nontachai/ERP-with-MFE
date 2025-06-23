import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services";

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
  const users = await userService.getAllUsers();
  reply.send(users);
}

export async function getUserById(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const userId = request.params.userId;
  const user = await userService.getUserById(userId);
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }
  reply.send(user);
}

export async function createUser(
  request: FastifyRequest<{
    Body: { email: string; password: string; name: string; roleId: string };
  }>,
  reply: FastifyReply
) {
  const userId = await userService.generateUserId();
  const { email, password, name, roleId } = request.body;
  try {
    const user = await userService.createUser(
      userId,
      email,
      password,
      name,
      roleId
    );
    reply.code(201).send(user);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
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
  try {
    const updatedUser = await userService.updateUserById(userId, {
      name,
      roleId,
      updatedAt: new Date(),
    });
    reply.send(updatedUser);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}

export async function deleteUserById(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const userId = request.params.userId;
  try {
    await userService.deleteUserById(userId);
    reply.code(204).send();
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}
