-- CreateTable
CREATE TABLE `Fit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mold` VARCHAR(191) NOT NULL,
    `product_code` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `process` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Controller_attention_point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `technician` VARCHAR(191) NOT NULL,
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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fitId` INTEGER NOT NULL,
    `outros_descriptionId` INTEGER NOT NULL,

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
CREATE TABLE `Devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Used_tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pliers` BOOLEAN NOT NULL,
    `box_cutter` BOOLEAN NOT NULL,
    `screen_printing` BOOLEAN NOT NULL,
    `outrosId` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Safety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `helmet` BOOLEAN NOT NULL,
    `earplug` BOOLEAN NOT NULL,
    `safety_goggles` BOOLEAN NOT NULL,
    `safety_gloves` BOOLEAN NOT NULL,
    `safety_mask` BOOLEAN NOT NULL,
    `safety_boot` BOOLEAN NOT NULL,
    `outrosId` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image_and_description` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img_path` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `typeId` INTEGER NOT NULL,
    `fitId` INTEGER NOT NULL,
    `workstationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outros_description` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Controller_attention_point` ADD CONSTRAINT `Controller_attention_point_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workstation` ADD CONSTRAINT `Workstation_outros_descriptionId_fkey` FOREIGN KEY (`outros_descriptionId`) REFERENCES `Outros_description`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workstation` ADD CONSTRAINT `Workstation_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirements_and_specifications` ADD CONSTRAINT `Requirements_and_specifications_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devices` ADD CONSTRAINT `Devices_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Used_tools` ADD CONSTRAINT `Used_tools_outrosId_fkey` FOREIGN KEY (`outrosId`) REFERENCES `Outros_description`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Used_tools` ADD CONSTRAINT `Used_tools_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Safety` ADD CONSTRAINT `Safety_outrosId_fkey` FOREIGN KEY (`outrosId`) REFERENCES `Outros_description`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Safety` ADD CONSTRAINT `Safety_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_and_description` ADD CONSTRAINT `Image_and_description_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_and_description` ADD CONSTRAINT `Image_and_description_fitId_fkey` FOREIGN KEY (`fitId`) REFERENCES `Fit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image_and_description` ADD CONSTRAINT `Image_and_description_workstationId_fkey` FOREIGN KEY (`workstationId`) REFERENCES `Workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
