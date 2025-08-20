/*
  Warnings:

  - You are about to alter the column `telefono` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `clientes` MODIFY `telefono` INTEGER NOT NULL;
