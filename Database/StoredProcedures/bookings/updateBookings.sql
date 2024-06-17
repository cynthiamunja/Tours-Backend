USE ToursDB;
GO

CREATE OR ALTER PROCEDURE updateBooking
    @BookingID VARCHAR(255),
    @UserEmail VARCHAR(255),
    @TourBooked VARCHAR(255),
    @HotelBooked VARCHAR(255),
    @AdminEmail VARCHAR(255)
AS
BEGIN
    -- Check if the user is an admin (based on @UserEmail being @UserEmail)
    IF @UserEmail = @AdminEmail
    BEGIN
        UPDATE Bookings
        SET  TourBooked = @TourBooked,
             HotelBooked = @HotelBooked
            
        WHERE BookingID = @BookingID;
    END
    ELSE
    BEGIN
        -- Check if the user is the one who made the booking
            UPDATE Bookings
            SET TourBooked = @TourBooked,
                HotelBooked = @HotelBooked
            WHERE BookingID = @BookingID AND UserEmail=@UserEmail;
        END
       
   
END;
GO
