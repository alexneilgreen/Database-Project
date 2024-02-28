USE cop4710db_test;

-- Create an event associated with the RSO
INSERT INTO Events (rsoId, eventName, eventTime, locationLat, locationLong, eventAddress, eventDescr)
VALUES (1, 'Test Event', '2024-02-25 14:00:00', 40.7128, -74.0060, 'Test Address', 'This is a test event');

-- Get the auto-generated event ID
SET @eventId := LAST_INSERT_ID();

-- Add the event to the event list of user ID 2
INSERT INTO Event_Lists (userId, eventId) VALUES (2, @eventId);