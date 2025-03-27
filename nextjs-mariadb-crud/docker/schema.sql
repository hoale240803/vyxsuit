-- Database schema for VyxSuit

-- Users table (for authentication and basic user management)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Customer table
CREATE TABLE IF NOT EXISTS Customer (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  CompanyName VARCHAR(255)
);

-- Product table
CREATE TABLE IF NOT EXISTS Product (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Description TEXT,
  S3Url VARCHAR(500),
  ProductType ENUM('DesignOfSuit', 'Jacket', 'Trouser', 'Shirt', 'TailoredFit', 'FabricOptions', 'Button', 'Lining', 'SuitType', 'TrouserType') NOT NULL,
  Code VARCHAR(100) UNIQUE,
  Price DECIMAL(10,6) NOT NULL DEFAULT 0.00
);

-- ProductTranslation table
CREATE TABLE IF NOT EXISTS ProductTranslation (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  ProductId INT NOT NULL,
  Language VARCHAR(10) NOT NULL,
  TranslatedName VARCHAR(255) NOT NULL,
  FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
);

-- Measurement table
CREATE TABLE IF NOT EXISTS Measurement (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Unit ENUM('Cm', 'Inch') NOT NULL DEFAULT 'Cm',
  Chest DECIMAL(6,2),
  Shoulder DECIMAL(6,2),
  ArmLength DECIMAL(6,2),
  ArmShoulderJoint DECIMAL(6,2),
  ArmBicepWidth DECIMAL(6,2),
  JacketWidth DECIMAL(6,2),
  Abdomen DECIMAL(6,2),
  BellyTummy DECIMAL(6,2),
  Hips DECIMAL(6,2),
  Neck DECIMAL(6,2),
  Waist DECIMAL(6,2),
  UpperHips DECIMAL(6,2),
  HipsCrotch DECIMAL(6,2),
  Outswarm DECIMAL(6,2),
  Thigh DECIMAL(6,2),
  Calf DECIMAL(6,2)
);

-- Orders table
CREATE TABLE IF NOT EXISTS Orders (
  OrderId INT AUTO_INCREMENT PRIMARY KEY,
  CustomerId INT NOT NULL,
  MeasurementId INT,
  SalesOrderNumber VARCHAR(50) NOT NULL UNIQUE,
  Sequence TINYINT, 
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  Note TEXT,
  TotalAmount DECIMAL(10,6) NOT NULL DEFAULT 0.00,
  
  -- Shipping Info
  Country VARCHAR(100),
  City VARCHAR(100),
  State VARCHAR(100),
  
  FOREIGN KEY (CustomerId) REFERENCES Customer(Id),
  FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE SET NULL
);