USE ToursDB;
GO

CREATE OR ALTER PROCEDURE updateTours
    @TourID VARCHAR(255),
    @TourName VARCHAR(255),
    @TourPrice int ,
	@TourDescription VARCHAR(255)
AS
BEGIN
    UPDATE Tours
    SET TourName = @TourName, TourPrice= @TourPrice, TourDescription=@TourDescription
    WHERE TourID = @TourID;
END;
GO
