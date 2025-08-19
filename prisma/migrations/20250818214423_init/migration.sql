-- CreateTable
CREATE TABLE `clientes` (
    `idCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promociones` (
    `idPromocion` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaDesde` VARCHAR(191) NOT NULL,
    `fechaHasta` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `activa` BOOLEAN NOT NULL,

    PRIMARY KEY (`idPromocion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente_promociones` (
    `idCliente` INTEGER NOT NULL,
    `idPromocion` INTEGER NOT NULL,
    `porcentajeDescuento` DOUBLE NOT NULL,

    PRIMARY KEY (`idCliente`, `idPromocion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente_promociones` ADD CONSTRAINT `cliente_promociones_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `clientes`(`idCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente_promociones` ADD CONSTRAINT `cliente_promociones_idPromocion_fkey` FOREIGN KEY (`idPromocion`) REFERENCES `promociones`(`idPromocion`) ON DELETE RESTRICT ON UPDATE CASCADE;
