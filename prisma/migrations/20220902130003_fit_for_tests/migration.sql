-- CreateTable
CREATE TABLE `Fit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mold` VARCHAR(191) NOT NULL,
    `product_code` VARCHAR(191) NOT NULL,
    `product_description` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `process` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attention_point_control` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirements` VARCHAR(191) NOT NULL,
    `specifications` VARCHAR(191) NOT NULL,
    `evaluation_technique` VARCHAR(191) NOT NULL,
    `control_method` VARCHAR(191) NOT NULL,
    `sample` VARCHAR(191) NOT NULL,
    `reaction_plan` VARCHAR(191) NOT NULL,
    `fitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workstation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img_layout_path` VARCHAR(191) NOT NULL,
    `specifics_requirements_client` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirements_and_specifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirements` VARCHAR(191) NOT NULL,
    `specifications` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Safety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `helmet` BOOLEAN NOT NULL DEFAULT false,
    `earplug` BOOLEAN NOT NULL DEFAULT false,
    `safety_goggles` BOOLEAN NOT NULL DEFAULT false,
    `safety_gloves` BOOLEAN NOT NULL DEFAULT false,
    `safety_mask` BOOLEAN NOT NULL DEFAULT false,
    `safety_boot` BOOLEAN NOT NULL DEFAULT false,
    `outros` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Used_tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pliers` BOOLEAN NOT NULL DEFAULT false,
    `box_cutter` BOOLEAN NOT NULL DEFAULT false,
    `screen_printing` BOOLEAN NOT NULL DEFAULT false,
    `outros` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image_operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img_path` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image_final_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img_path` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image_package_description` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img_path` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sap_code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Homologation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_created` JSON NOT NULL,
    `user_homologation` JSON NULL,
    `fitId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attention_point_control` ADD CONSTRAINT `Attention_point_control_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workstation` ADD CONSTRAINT `Workstation_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirements_and_specifications` ADD CONSTRAINT `Requirements_and_specifications_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Safety` ADD CONSTRAINT `Safety_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Used_tools` ADD CONSTRAINT `Used_tools_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_operation` ADD CONSTRAINT `Image_operation_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_final_product` ADD CONSTRAINT `Image_final_product_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_package_description` ADD CONSTRAINT `Image_package_description_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materials` ADD CONSTRAINT `Materials_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devices` ADD CONSTRAINT `Devices_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Homologation` ADD CONSTRAINT `Homologation_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Homologation` ADD CONSTRAINT `Homologation_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
