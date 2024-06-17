USE ToursDB;

CREATE TABLE Bookings(
BookingID VARCHAR(255) PRIMARY KEY,
UserName VARCHAR(255) NOT NULL,
UserEmail VARCHAR(255) FOREIGN KEY REFERENCES Users(Email) NOT NULL ,
TourBooked VARCHAR(255)FOREIGN KEY REFERENCES Tours(TourID) null ,
HotelBooked VARCHAR(255)FOREIGN KEY REFERENCES Hotels (HotelID)null ,
IsDeleted INT DEFAULT 0,
IsEmailSent INT DEFAULT 0
);