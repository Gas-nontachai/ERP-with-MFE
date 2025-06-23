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
      description: "can do every thing",
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

  // 3. สร้าง Permissions ตัวอย่าง
  const permissions = [
    { id: "P23062025001", name: "user" },
    { id: "P23062025002", name: "role" },
    { id: "P23062025003", name: "permission" },
  ];

  for (const perm of permissions) {
    // สร้าง permission
    await prisma.permission.upsert({
      where: { id: perm.id },
      update: {},
      create: {
        id: perm.id,
        name: perm.name,
        addBy: adminUserId,
        createdAt: now,
      },
    });

    // สร้าง RolePermission พร้อมสิทธิ์ทั้งหมด (view, create, update, delete = true)
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRoleId,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRoleId,
        permissionId: perm.id,
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
