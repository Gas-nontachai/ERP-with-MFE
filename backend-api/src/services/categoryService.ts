import { PrismaClient, Category } from "@prisma/client";
import { BadRequestError } from "../errors";
const prisma = new PrismaClient();

export async function generateCategoryId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 24062025
  const prefix = `C${dateStr}`;

  let sequence = 1;
  let categoryId: string;

  while (true) {
    const seqStr = sequence.toString().padStart(3, "0");
    categoryId = `${prefix}${seqStr}`;

    const exists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!exists) break;

    sequence++;
  }

  return categoryId;
}

export async function getCategoryById(
  categoryId: string
): Promise<Category | null> {
  return prisma.category.findUnique({
    where: { id: categoryId },
  });
}

export async function getAllCategorys(query: any): Promise<Category[]> {
  return prisma.category.findMany({ ...query });
}

export async function createCategory(
  categoryId: string,
  name: string,
  description: string,
  addBy: string
): Promise<Category> {
  const existingCategory = await prisma.category.findUnique({
    where: { name },
  });
  if (existingCategory) {
    throw new BadRequestError("Category already in use");
  }
  return prisma.category.create({
    data: { id: categoryId, name, description, addBy },
  });
}

export async function updateCategoryById(
  categoryId: string,
  data: {
    name?: string;
    description?: string;
    updateBy?: string;
    updatedAt?: Date;
  }
): Promise<Category> {
  return prisma.category.update({
    where: { id: categoryId },
    data,
  });
}

export async function deleteCategoryById(categoryId: string): Promise<void> {
  await prisma.category.delete({
    where: { id: categoryId },
  });
}
