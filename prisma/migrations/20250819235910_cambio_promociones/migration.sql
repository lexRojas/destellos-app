/*
  Warnings:

  - You are about to drop the column `porcentajeDescuento` on the `cliente_promociones` table. All the data in the column will be lost.
  - Added the required column `premio` to the `cliente_promociones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente_promociones` DROP COLUMN `porcentajeDescuento`,
    ADD COLUMN `premio` VARCHAR(191) NOT NULL;
