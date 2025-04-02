-- 1. create new user 
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS vyxsuit_db;

-- Drop user if exists
DROP USER IF EXISTS 'vyxsuit_user'@'localhost';
DROP USER IF EXISTS 'vyxsuit_user'@'%';

-- Create new user with all permissions
CREATE USER 'vyxsuit_user'@'localhost' IDENTIFIED BY 'vyxsuit_password';
CREATE USER 'vyxsuit_user'@'%' IDENTIFIED BY 'vyxsuit_password';

-- Grant privileges to the user for specific database
GRANT ALL PRIVILEGES ON vyxsuit_db.* TO 'vyxsuit_user'@'localhost';
GRANT ALL PRIVILEGES ON vyxsuit_db.* TO 'vyxsuit_user'@'%';

-- Apply the privileges
FLUSH PRIVILEGES;

-- Use the database
USE vyxsuit_db;

-- Drop tables if they exist
DROP TABLE IF EXISTS OrderDetail;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS MeasurementImage;
DROP TABLE IF EXISTS TrouserMeasurement;
DROP TABLE IF EXISTS ShirtMeasurement;
DROP TABLE IF EXISTS Measurement;
DROP TABLE IF EXISTS ProductTranslation;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Customer;


CREATE TABLE Customer (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    CompanyName VARCHAR(255)
);

CREATE TABLE Product (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    S3Url VARCHAR(500),
    ProductType ENUM(
        'DesignOfSuit', 
        'JacketOnly', 
        'TrouserOnly', 
        'VestCoatOnly', 
        'FabricOptions', 
        'Shirt', 
        'TailoredFit', 
        'Button', 
        'Lining', 
        'SuitType') NOT NULL,
    PriceType ENUM(
        'FullSuit',
        'TwoPieceSuit', 
        'ThreePieceSuit',

        'JacketOnlySuperWool150',
        'JacketOnlyVelvette',	
        'JacketOnlyCashmereWool',	
        'JacketOnlyLinen200GSM',	
        'JacketOnlyMerinoWool',

        'TrouserOnlySuperWool150',	
        'TrouserOnlyVelvette',
        'TrouserOnlyCashmereBlend',	
        'TrouserOnlyLinen200GSM',	
        'TrouserOnlyMerinoWool',	

        'VestCoatOnlySuperWool150',	
        'VestCoatOnlyVelvette',
        'VestCoatOnlyCashmereWool',
        'VestCoatOnlyLinen200GSM',
        'VestCoatOnlyMerinoWool',
        
        'FullSuitSuperWool150',
        'FullSuitVelvette',
        'FullSuitCashmereWool',
        'FullSuitLinen200GSM',
        'FullSuitMerinoWool',
        
        'Lining',
        'Button',
        'TrouserOnly'
    ) NOT NULL,


    Code VARCHAR(100),
    Price DECIMAL(10,6) NOT NULL DEFAULT 0.00,
    IsPrimary BOOLEAN DEFAULT FALSE
);

CREATE TABLE ProductTranslation (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT NOT NULL,
    Language VARCHAR(10) NOT NULL,
    TranslatedName VARCHAR(255) NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
);

CREATE TABLE Measurement (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Unit ENUM('Cm', 'Inch') NOT NULL
);

CREATE TABLE ShirtMeasurement (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MeasurementId INT NOT NULL,
    Chest DECIMAL(5,2),
    Shoulder DECIMAL(5,2),
    ArmLength DECIMAL(5,2),
    ArmShoulderJoint DECIMAL(5,2),
    ArmBicepWidth DECIMAL(5,2),
    JacketWidth DECIMAL(5,2),
    Abdomen DECIMAL(5,2),
    BellyTummy DECIMAL(5,2),
    Hips DECIMAL(5,2),
    Neck DECIMAL(5,2),
    MeasurementType ENUM('Shirt', 'Trouser') NOT NULL,
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);

CREATE TABLE TrouserMeasurement (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MeasurementId INT NOT NULL,
    Waist DECIMAL(5,2),
    UpperHips DECIMAL(5,2),
    HipsCrotch DECIMAL(5,2),
    Outswarm DECIMAL(5,2),
    Thigh DECIMAL(5,2),
    Calf DECIMAL(5,2),
    MeasurementType ENUM('Shirt', 'Trouser') NOT NULL,
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);

CREATE TABLE MeasurementImage (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    S3Url VARCHAR(500),
    MeasurementId INT NOT NULL,
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);


CREATE TABLE Orders (
    OrderId INT AUTO_INCREMENT PRIMARY KEY,
    CustomerId INT NOT NULL,
    MeasurementId INT NOT NULL,
    SalesOrderNumber VARCHAR(50) NOT NULL UNIQUE,
    Sequence TINYINT, 
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Note TEXT,
    TotalAmount DECIMAL(10,6) NOT NULL DEFAULT 0.00,

    -- Shipping Info 
    Country VARCHAR(100), 
    City VARCHAR(100),
    State VARCHAR(100),
    ZipCode VARCHAR(20),
    Phone VARCHAR(15),
    ShippingMethod ENUM('Standard', 'Express') NOT NULL,
    DifferentAddress BOOLEAN DEFAULT FALSE,
    
    -- Payment Info
    PaymentStatus ENUM('failed', 'success', 'none') NOT NULL,
    StripeId VARCHAR(1000),
    
    -- Localization
    Lang VARCHAR(10),
    CurrencyCode VARCHAR(10),
    CurrencyRate DECIMAL(10,6) DEFAULT 1.00,

    FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE,
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);

CREATE TABLE OrderDetail (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL COMMENT 'suitId, suiTypeId, trouserId, jacketId, fabridId, liningId, buttonId', 
    Price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    Quantity TINYINT NOT NULL DEFAULT 1,
    SuitType ENUM('TwoPieceSuit', 'ThreePieceSuit'),
    TailoredFit ENUM('SlimFit', 'ComfortFit'),

    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
);

