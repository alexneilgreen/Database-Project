USE cop4710db_test;

-- Inserting dummy user data
INSERT INTO users (username, phone, email, password) 
VALUES ('admin1', '1234567890', 'base_admin@database.com', 'adminpass1');

-- Getting the ID of the inserted user
SET @userId = LAST_INSERT_ID();

-- Inserting dummy admin data with the obtained user ID
INSERT INTO admins (userId) VALUES (@userId);

-- Insert dummy user data
INSERT INTO users (username, phone, email, password) 
VALUES ('admin2', '0987654321', 'ex_admin@database.com', 'adminpass2');

-- Getting the ID of the inserted user
SET @userId = LAST_INSERT_ID();

-- Inserting dummy admin data with the obtained user ID
INSERT INTO admins (userId) VALUES (@userId);
