USE ToursDB;
GO

CREATE OR ALTER PROCEDURE AddUsers
    @UserID VARCHAR(255),
    @UserName VARCHAR(255),
    @Email VARCHAR(255) ,
    @UserPassword VARCHAR(255) 
AS
BEGIN
    INSERT INTO Users (UserID, UserName, Email, UserPassword)
    VALUES (@UserID, @UserName, @Email, @UserPassword)
END;
GO
