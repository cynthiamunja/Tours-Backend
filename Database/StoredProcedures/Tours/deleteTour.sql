USE ToursDB;
GO

CREATE OR ALTER PROCEDURE deleteTour
    @TourID VARCHAR(255)
AS
BEGIN
   UPDATE Tours
    SET isDeleted = 1
    WHERE TourID = @TourID;
END;
GO
