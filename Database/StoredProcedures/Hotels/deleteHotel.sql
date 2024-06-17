USE ToursDB;

GO

CREATE or alter PROCEDURE deleteHotel
    @HotelID VARCHAR(255)
AS
BEGIN
     UPDATE Hotels
    SET isDeleted = 1
    WHERE HotelID = @HotelID;
END;
GO
