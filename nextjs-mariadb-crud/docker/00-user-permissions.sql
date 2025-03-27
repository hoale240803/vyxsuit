-- Drop user if exists to avoid errors on recreation
DROP USER IF EXISTS 'vyxsuit_user'@'%';

-- Create user with % wildcard to allow connections from any host
CREATE USER 'vyxsuit_user'@'%' IDENTIFIED BY 'password';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON vyxsuit_db.* TO 'vyxsuit_user'@'%';

-- Apply the changes
FLUSH PRIVILEGES;