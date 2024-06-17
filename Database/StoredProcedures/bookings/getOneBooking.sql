USE ToursDB;
GO

CREATE OR ALTER PROCEDURE getOneBooking
    @BookingID VARCHAR(255),
    @UserEmail VARCHAR(255),
    @AdminEmail VARCHAR(255)
AS
BEGIN
    IF @UserEmail = @AdminEmail
    BEGIN
        SELECT * FROM Bookings WHERE BookingID = @BookingID;
    END
    ELSE
    BEGIN
        SELECT * FROM Bookings WHERE BookingID = @BookingID AND UserEmail = @UserEmail;
    END
END;
GO
