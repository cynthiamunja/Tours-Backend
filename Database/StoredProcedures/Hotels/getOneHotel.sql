USE ToursDB;

GO

CREATE PROCEDURE getOneHotel
    @HotelID VARCHAR(255)
AS
BEGIN
    SELECT * FROM Hotels WHERE HotelID = @HotelID;
END;
GO
