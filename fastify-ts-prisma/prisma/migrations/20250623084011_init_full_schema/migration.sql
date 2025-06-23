-- AlterTable
ALTER TABLE `Permission` ADD COLUMN `addBy` VARCHAR(191) NULL,
    ADD COLUMN `updateBy` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `addBy` VARCHAR(191) NULL,
    ADD COLUMN `updateBy` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `RolePermission` ADD COLUMN `addBy` VARCHAR(191) NULL,
    ADD COLUMN `updateBy` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_addBy_fkey` FOREIGN KEY (`addBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_updateBy_fkey` FOREIGN KEY (`updateBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_addBy_fkey` FOREIGN KEY (`addBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_updateBy_fkey` FOREIGN KEY (`updateBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_addBy_fkey` FOREIGN KEY (`addBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_updateBy_fkey` FOREIGN KEY (`updateBy`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
