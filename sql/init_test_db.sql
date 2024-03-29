CREATE DATABASE cop4710db_test;

USE cop4710db_test;

CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Admins (
    adminId INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE RSOs (
    rsoName VARCHAR(50) NOT NULL UNIQUE,
    rsoDescription VARCHAR(200) NOT NULL,
    rsoId INT AUTO_INCREMENT PRIMARY KEY,
    adminCode VARCHAR(30) NOT NULL
);

CREATE TABLE Events (
    eventId INT AUTO_INCREMENT PRIMARY KEY,
    rsoId INT,
    eventName VARCHAR(50) NOT NULL,
    eventTime VARCHAR(50) NOT NULL,
    locationLat DECIMAL(10, 8) NOT NULL,
    locationLong DECIMAL(11, 8) NOT NULL,
    eventAddress VARCHAR(100) NOT NULL,
    eventDescription VARCHAR(200) NOT NULL,
    FOREIGN KEY (rsoId) REFERENCES RSOs(rsoId) ON DELETE CASCADE
);

CREATE TABLE Event_Lists (
    entryId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    eventId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE
);

CREATE TABLE RSO_Followers (
    userId INT,
    rsoId INT,
    PRIMARY KEY (userId, rsoId),
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE,
    FOREIGN KEY (rsoId) REFERENCES RSOs(rsoId) ON DELETE CASCADE
);

CREATE TABLE RSO_Owners (
    adminId INT,
    rsoId INT,
    PRIMARY KEY (adminId, rsoId),
    FOREIGN KEY (adminId) REFERENCES Admins(adminId) ON DELETE CASCADE,
    FOREIGN KEY (rsoId) REFERENCES RSOs(rsoId) ON DELETE CASCADE
);