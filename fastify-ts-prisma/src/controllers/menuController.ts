import { FastifyRequest, FastifyReply } from "fastify";
import { menuService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";

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
  reply.send(menus);
}

export async function getMenuById(
  request: FastifyRequest<{ Params: { menuId: string } }>,
  reply: FastifyReply
) {
  const menuId = request.params.menuId;
  const menu = await menuService.getMenuById(menuId);
  if (!menu) {
    return reply.status(404).send({ error: "Menu not found" });
  }
  reply.send(menu);
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
  try {
    const menu = await menuService.createMenu(
      menuId,
      name,
      description,
      addBy
    );
    reply.code(201).send(menu);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
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
  try {
    const updatedMenu = await menuService.updateMenuById(
      menuId,
      {
        name,
        description,
        updateBy,
        updatedAt: new Date(),
      }
    );
    reply.send(updatedMenu);
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}

export async function deleteMenuById(
  request: FastifyRequest<{ Params: { menuId: string } }>,
  reply: FastifyReply
) {
  const menuId = request.params.menuId;
  try {
    await menuService.deleteMenuById(menuId);
    reply.code(204).send();
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
}
