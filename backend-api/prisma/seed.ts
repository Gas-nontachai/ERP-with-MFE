import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  // กำหนด ID เอง เพื่อเชื่อม FK ง่ายขึ้น
  const adminUserId = "U23062025001";
  const adminRoleId = "R23062025001";

  // 1. สร้าง Role ก่อน
  await prisma.role.upsert({
    where: { id: adminRoleId },
    update: {},
    create: {
      id: adminRoleId,
      name: "admin",
      description: "can do everything",
      createdAt: now,
    },
  });

  // 2. สร้าง Admin User พร้อม roleId
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { userId: adminUserId },
    update: {},
    create: {
      userId: adminUserId,
      email: "admin@gmail.com",
      password: hashedPassword,
      name: "admin",
      roleId: adminRoleId,
      createdAt: now,
    },
  });

  // 3. สร้าง Menus ตัวอย่าง
  const menus = [
    { id: "M23062025001", name: "users", description: "about users" },
    { id: "M23062025002", name: "roles", description: "about roles" },
    { id: "M23062025003", name: "menus", description: "about menus" },
    {
      id: "M23062025004",
      name: "permissions",
      description: "about permissions",
    },
  ];

  for (const menu of menus) {
    // สร้าง Menu
    await prisma.menu.upsert({
      where: { id: menu.id },
      update: {},
      create: {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        addBy: adminUserId,
        createdAt: now,
      },
    });

    // สร้าง Permission (แทน RolePermission เดิม)
    await prisma.permission.upsert({
      where: {
        roleId_menuId: {
          roleId: adminRoleId,
          menuId: menu.id,
        },
      },
      update: {},
      create: {
        roleId: adminRoleId,
        menuId: menu.id,
        view: true,
        create: true,
        update: true,
        delete: true,
        addBy: adminUserId,
        createdAt: now,
      },
    });
  }

  console.log("✅ Seed data created successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
