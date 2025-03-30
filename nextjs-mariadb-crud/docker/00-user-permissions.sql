-- Log: Granting all privileges to vyxsuit_user
SELECT 'Granting all privileges to vyxsuit_user' AS log_message;
GRANT ALL PRIVILEGES ON *.* TO 'vyxsuit_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Log: Revoking all privileges from root
SELECT 'Revoking all privileges from root' AS log_message;
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'root'@'localhost';

-- Log: Dropping root user
SELECT 'Dropping root user' AS log_message;
DROP USER IF EXISTS 'root'@'localhost';
FLUSH PRIVILEGES;

-- Log: Permissions setup completed
SELECT 'Permissions setup completed' AS log_message;