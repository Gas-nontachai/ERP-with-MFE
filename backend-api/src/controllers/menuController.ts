import { FastifyRequest, FastifyReply } from "fastify";
import { menuService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { NotFoundError } from "../errors/";
import { sendSuccess } from "../utils/response";

export async function generateMenuId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const menuId = await menuService.generateMenuId();
  reply.send({ menuId });
}

export async function getAllMenus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const menus = await menuService.getAllMenus(query);
  sendSuccess(reply, menus, "Get Menu successfully");
}

export async function getMenuById(
  request: FastifyRequest<{ Params: { menuId: string } }>,
  reply: FastifyReply
) {
  const menuId = request.params.menuId;
  const menu = await menuService.getMenuById(menuId);
  if (!menu) {
    throw new NotFoundError("Menu not found");
  }
  sendSuccess(reply, menu, "Get Menu successfully");
}

export async function createMenu(
  request: FastifyRequest<{
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const menuId = await menuService.generateMenuId();
  const { name, description } = request.body;
  const addBy = (request.user as any).userId;
  const menu = await menuService.createMenu(menuId, name, description, addBy);
  sendSuccess(reply, menu, "Create Menu successfully");
}

export async function updateMenuById(
  request: FastifyRequest<{
    Params: { menuId: string };
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const menuId = request.params.menuId;
  const { name, description } = request.body;
  const updateBy = (request.user as any).userId;
  const updatedMenu = await menuService.updateMenuById(menuId, {
    name,
    description,
    updateBy,
    updatedAt: new Date(),
  });
  sendSuccess(reply, updatedMenu, "Update Menu successfully");
}

export async function deleteMenuById(
  request: FastifyRequest<{ Params: { menuId: string } }>,
  reply: FastifyReply
) {
  const menuId = request.params.menuId;
  await menuService.deleteMenuById(menuId);
  sendSuccess(reply, { delete: true }, "Delete Menu successfully");
}
