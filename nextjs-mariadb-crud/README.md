Vyx db

```
CREATE TABLE Customer (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    CompanyName VARCHAR(255)
);

CREATE TABLE Product (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    S3Url VARCHAR(500),
    ProductType ENUM('DesignOfSuit', 'Jacket', 'Trouser', 'Shirt', 'TailoredFit','FabricOptions', 'Button', 'Lining', 'SuitType', 'TrouserType') NOT NULL,
    Code VARCHAR(100) UNIQUE,
    Price DECIMAL(10,6) NOT NULL DEFAULT 0.00
);

CREATE TABLE ProductTranslation (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT NOT NULL,
    Language VARCHAR(10) NOT NULL,
    TranslatedName VARCHAR(255) NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
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
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE SET NULL
);

CREATE TABLE Measurement (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MeasurementType ENUM('Shirt', 'Trouser') NOT NULL,
    Unit ENUM('Cm', 'Inch') NOT NULL
);

CREATE TABLE OrderDetail (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    Quantity TINYINT NOT NULL DEFAULT 1,
    SuitType ENUM('2piece', '3piece'),
    TrouserId INT,
    TailoredFit ENUM('SlimFit', 'ComfortFit'),
    FabricId INT,
    LiningId INT,
    ButtonId INT,

    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
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
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);

CREATE TABLE MeasurementImage (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    S3Url VARCHAR(500),
    MeasurementId INT NOT NULL,
    FOREIGN KEY (MeasurementId) REFERENCES Measurement(Id) ON DELETE CASCADE
);
```