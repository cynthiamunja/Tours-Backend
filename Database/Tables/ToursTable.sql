USE ToursDB;

CREATE TABLE Tours (
    TourID VARCHAR(255) PRIMARY KEY ,
    TourName VARCHAR(255) NOT NULL,
	TourPrice int not null,
	TourDescription VARCHAR(255) NOT NULL,
    isDeleted int default 0
	
);