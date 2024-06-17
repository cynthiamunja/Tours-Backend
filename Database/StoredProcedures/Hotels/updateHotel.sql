USE ToursDB;
GO


CREATE PROCEDURE updateHotel
    @HotelID VARCHAR(255),
    @HotelName VARCHAR(255),
    @HotelPrice INT,
    @HotelDescription VARCHAR(255)
AS
BEGIN
    UPDATE Hotels
    SET HotelName = @HotelName,
        HotelDescription = @HotelDescription,
        HotelPrice=@HotelPrice
    WHERE HotelID = @HotelID;
END;
GO
