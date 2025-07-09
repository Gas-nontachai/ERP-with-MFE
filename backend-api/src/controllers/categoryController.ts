import { FastifyRequest, FastifyReply } from "fastify";
import { categoryService } from "../services";
import { buildPrismaQuery, QueryParams } from "../utils/buildPrismaQuery";
import { NotFoundError } from "../errors";
import { sendSuccess } from "../utils/response";

export async function generateCategoryId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryId = await categoryService.generateCategoryId();
  reply.send({ categoryId });
}

export async function getAllCategorys(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = buildPrismaQuery(request.query as QueryParams);
  const categorys = await categoryService.getAllCategorys(query);
  sendSuccess(reply, categorys, "Get Category successfully");
}

export async function getCategoryById(
  request: FastifyRequest<{ Params: { categoryId: string } }>,
  reply: FastifyReply
) {
  const categoryId = request.params.categoryId;
  const category = await categoryService.getCategoryById(categoryId);
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  sendSuccess(reply, category, "Get Category successfully");
}

export async function createCategory(
  request: FastifyRequest<{
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const categoryId = await categoryService.generateCategoryId();
  const { name, description } = request.body;
  const addBy = (request.user as any).userId;
  const category = await categoryService.createCategory(
    categoryId,
    name,
    description,
    addBy
  );
  sendSuccess(reply, category, "Create Category successfully");
}

export async function updateCategoryById(
  request: FastifyRequest<{
    Params: { categoryId: string };
    Body: { name: string; description: string };
  }>,
  reply: FastifyReply
) {
  const categoryId = request.params.categoryId;
  const { name, description } = request.body;
  const updateBy = (request.user as any).userId;
  const updatedCategory = await categoryService.updateCategoryById(categoryId, {
    name,
    description,
    updateBy,
    updatedAt: new Date(),
  });
  sendSuccess(reply, updatedCategory, "Update Category successfully");
}

export async function deleteCategoryById(
  request: FastifyRequest<{ Params: { categoryId: string } }>,
  reply: FastifyReply
) {
  const categoryId = request.params.categoryId;
  await categoryService.deleteCategoryById(categoryId);
  sendSuccess(reply, { delete: true }, "Delete Category successfully");
}
