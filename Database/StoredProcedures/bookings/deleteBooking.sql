USE ToursDB;
GO

CREATE OR ALTER PROCEDURE deleteBooking
    @BookingID VARCHAR(255),
    @UserEmail VARCHAR(255),
    @AdminEmail VARCHAR(255)
AS
BEGIN
    -- Check if the user is an admin (based on @UserEmail being @AdminEmail)
    IF @UserEmail = @AdminEmail
    BEGIN
        DELETE FROM Bookings
        WHERE BookingID = @BookingID;
    END
    ELSE
    BEGIN
        -- Check if the user is the one who made the booking
        DELETE FROM Bookings
        WHERE BookingID = @BookingID AND UserEmail = @UserEmail;
    END
END;
GO
