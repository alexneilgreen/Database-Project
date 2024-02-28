USE cop4710db_test;

-- Create a test RSO
INSERT INTO rsos (rsoname, rsodescription, admincode) 
VALUES ('test-rso', 'A RSO for testing the database', 'adminCode1');

-- Get the auto-generated RSO ID
SET @rsoId := LAST_INSERT_ID();

-- Associate an admin (id=1) with the RSO
INSERT INTO RSO_Owners (adminId, rsoId) 
VALUES (1, @rsoId);

-- Get a user (id=2) to "follow" that RSO
INSERT INTO RSO_Followers (userId, rsoId) 
VALUES (2, @rsoId);