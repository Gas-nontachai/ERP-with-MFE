import { FastifyReply, FastifyRequest } from "fastify";
import { authService, userService } from "../services";

export async function register(
  request: FastifyRequest<{
    Body: { email: string; password: string; name: string; roleId: string };
  }>,
  reply: FastifyReply
) {
  const { email, password, name, roleId } = request.body;
  const userId = await userService.generateUserId();
  if (!email || !password || !name) {
    return reply
      .status(400)
      .send({ error: "Email, password and name are required" });
  }
  try {
    const user = await authService.registerUser(
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

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
  fastify: any
) {
  const { email, password } = request.body as any;

  const user = await authService.findUserByEmail(email);

  if (!user) return reply.status(401).send({ error: "Invalid email" });

  const isMatch = await authService.verifyPassword(password, user.password);
  if (!isMatch) return reply.status(401).send({ error: "Wrong password" });

  const token = fastify.jwt.sign({ userId: user.userId, email: user.email });

  // ตัด password ออกก่อนส่ง
  const { password: _pw, ...safeUser } = user;
  reply.send({ token, user: safeUser });
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  const userId = (request.user as any).userId;
  const user = await authService.findUserById(userId);
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }
  const { password: _pw, ...safeUser } = user;
  reply.send(safeUser);
}
