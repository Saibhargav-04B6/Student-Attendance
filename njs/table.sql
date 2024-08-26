CREATE DATABASE Bharath
Show databases
use Bharath
show tables
-- Create Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) UNIQUE NOT NULL,
    RFIDCardNumber VARCHAR(50) UNIQUE NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Create Table Admins(
UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) UNIQUE NOT NULL,
    passkey varchar(100)  
);

-- Create EntryExitLogs Table
CREATE TABLE EntryExitLogs (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    EntryTime DATETIME,
    ExitTime DATETIME,
    LogDate date,
    status varchar(10),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Example insert statements

-- Inserting Users
INSERT INTO Users (UserName, UserEmail, RFIDCardNumber)
VALUES ('John Doe', 'john.doe@example.com', 'RFID123456');

INSERT INTO Users (UserName, UserEmail, RFIDCardNumber)
VALUES ('Jane Smith', 'jane.smith@example.com', 'RFID654321');

-- Inserting Entry and Exit Logs
INSERT INTO EntryExitLogs (UserID, EntryTime, ExitTime,LogDate)
VALUES (1, '2024-08-01 08:00:00', '2024-08-01 17:00:00','2024-01-05','IN');
INSERT INTO EntryExitLogs (UserID, EntryTime, ExitTime)
VALUES (2, '2024-08-01 09:00:00', '2024-08-01 18:00:00','2023-05-16','IN');
select*from Users
join EntryExitLogs ON Users.UserID = EntryExitLogs.UserID;
