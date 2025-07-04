import { PrismaClient, Menu } from "@prisma/client";
import { BadRequestError } from "../errors/"; 
const prisma = new PrismaClient();

export async function generateMenuId(): Promise<string> {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  const dateStr = `${dd}${mm}${yyyy}`; // เช่น 24062025
  const prefix = `M${dateStr}`;

  let sequence = 1;
  let menuId: string;

  while (true) {
    const seqStr = sequence.toString().padStart(3, "0");
    menuId = `${prefix}${seqStr}`;

    const exists = await prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!exists) break;

    sequence++;
  }

  return menuId;
}

export async function getMenuById(menuId: string): Promise<Menu | null> {
  return prisma.menu.findUnique({
    where: { id: menuId },
  });
}

export async function getAllMenus(query: any): Promise<Menu[]> {
  return prisma.menu.findMany({ ...query });
}

export async function createMenu(
  menuId: string,
  name: string,
  description: string,
  addBy: string
): Promise<Menu> {
  const existingMenu = await prisma.menu.findUnique({
    where: { name },
  });
  if (existingMenu) {
    throw new BadRequestError("Menu name already in use");
  }

  return prisma.menu.create({
    data: { id: menuId, name, description, addBy },
  });
}

export async function updateMenuById(
  menuId: string,
  data: {
    name?: string;
    description?: string;
    updateBy?: string;
    updatedAt?: Date;
  }
): Promise<Menu> {
  return prisma.menu.update({
    where: { id: menuId },
    data,
  });
}

export async function deleteMenuById(menuId: string): Promise<void> {
  await prisma.menu.delete({
    where: { id: menuId },
  });
}
