 USE ToursDB;
 GO
  CREATE OR ALTER PROCEDURE getOneUser(@Email VARCHAR(255))
  AS
  BEGIN
  SELECT * FROM Users where Email=@Email
  END