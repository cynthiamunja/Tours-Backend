USE ToursDB;
GO

CREATE OR ALTER PROCEDURE addTours
    @TourID VARCHAR ,
    @TourName VARCHAR(255) ,
	@TourPrice int ,
	@TourDescription VARCHAR(255)
AS
BEGIN
    INSERT INTO Tours(TourID, TourName, TourPrice, TourDescription)
    VALUES (@TourID, @TourName,@TourPrice, @TourDescription);
END;
GO
