-- Clear existing data (optional)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE users;
TRUNCATE TABLE Customer;
TRUNCATE TABLE Product;
TRUNCATE TABLE ProductTranslation;
TRUNCATE TABLE Measurement;
TRUNCATE TABLE Orders;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert users data
INSERT INTO users (name, email) VALUES 
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Bob Johnson', 'bob@example.com');

-- Insert customer data
INSERT INTO Customer (FirstName, LastName, Email, CompanyName) VALUES
  ('Hoa', 'Le', 'hoa@vyxsuit.com', 'VyxSuit'),
  ('Minh', 'Nguyen', 'minh@example.com', 'Fashion Inc'),
  ('Tuan', 'Tran', 'tuan@example.com', NULL);

-- Insert product data
INSERT INTO Product (Name, Description, ProductType, Code, Price) VALUES
  ('Classic Two-Piece', 'Traditional two-piece suit', 'SuitType', 'ST001', 299.99),
  ('Premium Three-Piece', 'Elegant three-piece suit with waistcoat', 'SuitType', 'ST002', 399.99),
  ('Regular Fit Trouser', 'Comfortable regular fit trouser', 'TrouserType', 'TT001', 89.99),
  ('Slim Fit Trouser', 'Modern slim fit trouser', 'TrouserType', 'TT002', 99.99),
  ('Slim Fit', 'Modern slim silhouette', 'TailoredFit', 'TF001', 0.00),
  ('Comfort Fit', 'Relaxed comfortable fit', 'TailoredFit', 'TF002', 0.00),
  ('Italian Wool', 'Premium Italian wool fabric', 'FabricOptions', 'FA001', 49.99),
  ('Pearl Buttons', 'Elegant mother of pearl buttons', 'Button', 'BT001', 9.99),
  ('Silk Lining', 'Luxurious silk lining', 'Lining', 'LN001', 19.99);

-- Insert product translations
INSERT INTO ProductTranslation (ProductId, Language, TranslatedName) VALUES
  (1, 'vi', 'Bộ Vest Hai Mảnh Cổ Điển'),
  (2, 'vi', 'Bộ Vest Ba Mảnh Cao Cấp'),
  (3, 'vi', 'Quần Ống Đứng');

-- Insert measurement data
INSERT INTO Measurement (Unit, Chest, Shoulder, Waist, Hips) VALUES
  ('Cm', 100.0, 45.5, 85.0, 95.0),
  ('Inch', 40.5, 18.2, 34.0, 38.0);

-- Insert order data
INSERT INTO Orders (CustomerId, MeasurementId, SalesOrderNumber, TotalAmount, Country, City) VALUES
  (1, 1, 'VYX-2025-0001', 349.97, 'Vietnam', 'Ho Chi Minh City'),
  (2, 2, 'VYX-2025-0002', 529.96, 'Vietnam', 'Hanoi');