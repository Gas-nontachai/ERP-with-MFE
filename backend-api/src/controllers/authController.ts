import { FastifyReply, FastifyRequest } from "fastify";
import { authService, userService, permissionService } from "../services";
import { NotFoundError, UnauthorizedError } from "../errors/";
import { sendSuccess } from "../utils/response";

export async function register(
  request: FastifyRequest<{
    Body: { email: string; password: string; name: string; roleId: string };
  }>,
  reply: FastifyReply
) {
  const { email, password, name, roleId } = request.body;
  const userId = await userService.generateUserId();
  if (!email || !password || !name) {
    throw new NotFoundError("Email, password and name are required");
  }
  const user = await authService.registerUser(
    userId,
    email,
    password,
    name,
    roleId
  );
  sendSuccess(reply, user, "Register successfully");
}

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
  fastify: any
) {
  const { email, password } = request.body as any;

  const user = await authService.findUserByEmail(email);
  const permission = await permissionService.getPermissions({
    where: {
      roleId: user?.roleId,
    },
  });

  if (!user) throw new UnauthorizedError("Invalid email");

  const isMatch = await authService.verifyPassword(password, user.password);
  if (!isMatch) throw new UnauthorizedError("Wrong password");

  const { password: _pw, ...safeUser } = user;

  const token = fastify.jwt.sign({ user: safeUser, permission });
  sendSuccess(reply, { token, user: safeUser, permission }, "Login successful");
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  const userId = (request.user as any).user.userId;
  const user = await authService.findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password: _pw, ...safeUser } = user;
  sendSuccess(reply, safeUser, "Get Profile successfully");
}
