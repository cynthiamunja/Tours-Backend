USE ToursDB;

GO

CREATE or alter PROCEDURE addBooking
    @BookingID VARCHAR(255),
    @UserName VARCHAR(255),
    @UserEmail VARCHAR(255) ,
    @TourBooked VARCHAR(255) null,
    @HotelBooked VARCHAR(255) NULL 
AS
BEGIN
    INSERT INTO Bookings (BookingID,UserName,  UserEmail,TourBooked, HotelBooked )
    VALUES (@BookingID, @UserName,@UserEmail,@TourBooked , @HotelBooked);
END;
GO
