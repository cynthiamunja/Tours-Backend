USE ToursDB;

GO

CREATE or alter PROCEDURE addHotel
    @HotelID VARCHAR(255),
    @HotelName VARCHAR(255),
    @HotelPrice INT,
    @HotelDescription VARCHAR(255)
AS
BEGIN
    INSERT INTO Hotels (HotelID,HotelName,  HotelPrice,HotelDescription )
    VALUES (@HotelID, @HotelName,@HotelPrice,@HotelDescription );
END;
GO
