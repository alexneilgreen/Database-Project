USE cop4710db;

-- Inserting dummy user data
INSERT INTO users (username, phone, email, password) 
VALUES ('admin1', '1234567890', 'dummy_admin@example.com', 'pass1');

-- Getting the ID of the inserted user
SET @userId = LAST_INSERT_ID();

-- Inserting dummy admin data with the obtained user ID
INSERT INTO admins (userId) VALUES (@userId);

-- Insert dummy user data
INSERT INTO users (username, phone, email, password) 
VALUES ('user1', '0987654321', 'dummy_user@example.com', 'pass1');
