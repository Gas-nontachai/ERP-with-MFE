import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  const roles = [
    { id: "R23062025001", name: "admin", description: "can do everything" },
    { id: "R23062025002", name: "sub-admin", description: "พนักงานทั่วไป" },
    { id: "R23062025003", name: "staff", description: "view everything" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: {
        ...role,
        createdAt: now,
      },
    });
  }

  console.log("✅ Roles seeded");

  const users = [
    {
      userId: "U23062025001",
      email: "admin@gmail.com",
      password: "admin123",
      name: "admin",
      roleId: "R23062025001",
    },
    {
      userId: "U23062025002",
      email: "subadmin@gmail.com",
      password: "subadmin123",
      name: "subadmin",
      roleId: "R23062025002",
    },
    {
      userId: "U23062025003",
      email: "staff@gmail.com",
      password: "staff123",
      name: "staff",
      roleId: "R23062025003",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { userId: user.userId },
      update: {},
      create: {
        userId: user.userId,
        email: user.email,
        password: hashedPassword,
        name: user.name,
        roleId: user.roleId,
        createdAt: now,
      },
    });
  }

  console.log("✅ Users seeded");

  const menus = [
    { id: "M23062025001", name: "users", description: "about users" },
    { id: "M23062025002", name: "roles", description: "about roles" },
    { id: "M23062025003", name: "menus", description: "about menus" },
    {
      id: "M23062025004",
      name: "permissions",
      description: "about permissions",
    },
    { id: "M23062025005", name: "products", description: "about products" },
    { id: "M23062025006", name: "categorys", description: "about categorys" },
  ];

  for (const menu of menus) {
    await prisma.menu.upsert({
      where: { id: menu.id },
      update: {},
      create: {
        ...menu,
        addBy: users[0].userId, // ใส่ admin เป็นผู้เพิ่ม
        createdAt: now,
      },
    });

    // เพิ่ม permission ให้ admin
    await prisma.permission.upsert({
      where: {
        roleId_menuId: {
          roleId: users[0].roleId, // admin's roleId
          menuId: menu.id,
        },
      },
      update: {},
      create: {
        roleId: users[0].roleId,
        menuId: menu.id,
        view: true,
        create: true,
        update: true,
        delete: true,
        addBy: users[0].userId,
        createdAt: now,
      },
    });
  }

  console.log("✅ Menus & Permissions seeded");
  console.log("🎉 Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
