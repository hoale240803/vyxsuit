-- CreateTable
CREATE TABLE `Customer` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `CompanyName` VARCHAR(255) NULL,

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Measurement` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `MeasurementType` ENUM('Shirt', 'Trouser') NOT NULL,
    `Unit` ENUM('Cm', 'Inch') NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeasurementImage` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NULL,
    `S3Url` VARCHAR(500) NULL,
    `MeasurementId` INTEGER NOT NULL,

    INDEX `MeasurementId`(`MeasurementId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderId` INTEGER NOT NULL,
    `ProductId` INTEGER NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `Quantity` TINYINT NOT NULL DEFAULT 1,
    `SuitType` ENUM('2piece', '3piece') NULL,
    `TrouserId` INTEGER NULL,
    `TailoredFit` ENUM('SlimFit', 'ComfortFit') NULL,
    `FabricId` INTEGER NULL,
    `LiningId` INTEGER NULL,
    `ButtonId` INTEGER NULL,

    INDEX `OrderId`(`OrderId`),
    INDEX `ProductId`(`ProductId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `OrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerId` INTEGER NOT NULL,
    `MeasurementId` INTEGER NOT NULL,
    `SalesOrderNumber` VARCHAR(50) NOT NULL,
    `Sequence` TINYINT NULL,
    `CreatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Note` TEXT NULL,
    `TotalAmount` DECIMAL(10, 6) NOT NULL DEFAULT 0.000000,
    `Country` VARCHAR(100) NULL,
    `City` VARCHAR(100) NULL,
    `State` VARCHAR(100) NULL,
    `ZipCode` VARCHAR(20) NULL,
    `Phone` VARCHAR(15) NULL,
    `ShippingMethod` ENUM('Standard', 'Express') NOT NULL,
    `DifferentAddress` BOOLEAN NULL DEFAULT false,
    `PaymentStatus` ENUM('failed', 'success', 'none') NOT NULL,
    `StripeId` VARCHAR(1000) NULL,
    `Lang` VARCHAR(10) NULL,
    `CurrencyCode` VARCHAR(10) NULL,
    `CurrencyRate` DECIMAL(10, 6) NULL DEFAULT 1.000000,

    UNIQUE INDEX `SalesOrderNumber`(`SalesOrderNumber`),
    INDEX `CustomerId`(`CustomerId`),
    INDEX `MeasurementId`(`MeasurementId`),
    PRIMARY KEY (`OrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT NULL,
    `S3Url` VARCHAR(500) NULL,
    `ProductType` ENUM('DesignOfSuit', 'JacketOnly', 'TrouserOnly', 'VestCoatOnly', 'FabricOptions', 'Shirt', 'TailoredFit', 'Button', 'Lining', 'SuitType') NOT NULL,
    `PriceType` ENUM('FullSuit', '2PieceSuit', '3PieceSuit', 'JacketOnlySuperWool150', 'JacketOnlyVelvette', 'JacketOnlyCashmereWool', 'JacketOnlyLinen200GSM', 'JacketOnlyMerinoWool', 'TrouserOnlySuperWool150', 'TrouserOnlyVelvette', 'TrouserOnlyCashmereBlend', 'TrouserOnlyLinen200GSM', 'TrouserOnlyMerinoWool', 'VestCoatOnlySuperWool150', 'VestCoatOnlyVelvette', 'VestCoatOnlyCashmereCahmereWool', 'VestCoatOnlyLinen200GSM', 'VestCoatOnlyMerinoWool') NOT NULL,
    `Code` VARCHAR(100) NULL,
    `Price` DECIMAL(10, 6) NOT NULL DEFAULT 0.000000,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTranslation` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductId` INTEGER NOT NULL,
    `Language` VARCHAR(10) NOT NULL,
    `TranslatedName` VARCHAR(255) NOT NULL,

    INDEX `ProductId`(`ProductId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShirtMeasurement` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `MeasurementId` INTEGER NOT NULL,
    `Chest` DECIMAL(5, 2) NULL,
    `Shoulder` DECIMAL(5, 2) NULL,
    `ArmLength` DECIMAL(5, 2) NULL,
    `ArmShoulderJoint` DECIMAL(5, 2) NULL,
    `ArmBicepWidth` DECIMAL(5, 2) NULL,
    `JacketWidth` DECIMAL(5, 2) NULL,
    `Abdomen` DECIMAL(5, 2) NULL,
    `BellyTummy` DECIMAL(5, 2) NULL,
    `Hips` DECIMAL(5, 2) NULL,
    `Neck` DECIMAL(5, 2) NULL,

    INDEX `MeasurementId`(`MeasurementId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrouserMeasurement` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `MeasurementId` INTEGER NOT NULL,
    `Waist` DECIMAL(5, 2) NULL,
    `UpperHips` DECIMAL(5, 2) NULL,
    `HipsCrotch` DECIMAL(5, 2) NULL,
    `Outswarm` DECIMAL(5, 2) NULL,
    `Thigh` DECIMAL(5, 2) NULL,
    `Calf` DECIMAL(5, 2) NULL,

    INDEX `MeasurementId`(`MeasurementId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MeasurementImage` ADD CONSTRAINT `MeasurementImage_ibfk_1` FOREIGN KEY (`MeasurementId`) REFERENCES `Measurement`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `Orders`(`OrderId`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `Customer`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`MeasurementId`) REFERENCES `Measurement`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ProductTranslation` ADD CONSTRAINT `ProductTranslation_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ShirtMeasurement` ADD CONSTRAINT `ShirtMeasurement_ibfk_1` FOREIGN KEY (`MeasurementId`) REFERENCES `Measurement`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `TrouserMeasurement` ADD CONSTRAINT `TrouserMeasurement_ibfk_1` FOREIGN KEY (`MeasurementId`) REFERENCES `Measurement`(`Id`) ON DELETE CASCADE ON UPDATE RESTRICT;
