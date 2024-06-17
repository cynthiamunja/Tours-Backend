USE ToursDB;
CREATE TABLE Hotels (
    HotelID VARCHAR(255) PRIMARY KEY,
    HotelName VARCHAR(255) NOT NULL,
    HotelPrice INT NOT NULL,
    HotelDescription VARCHAR(255) NOT NULL,
    isDeleted int default 0
);