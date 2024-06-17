import { Request } from 'express';
import { ExtendedRequest } from '../middlewares';

export interface booking {
    BookingID: string;
    HotelBooked: string;
    TourBooked: string;
    UserEmail: string;
    UserName: string;
}

export interface bookingRequest extends ExtendedRequest {
    body: {
        BookingID: string;
        HotelBooked: string;
        TourBooked: string;
        UserEmail: string;
        UserName: string;
        AdminEmail: string | null;
    };
    params: {
        id: string;
    };
}

export interface deletedbooking {
    BookingID: string;
    HotelBooked: string;
    TourBooked: string;
    UserEmail: string;
    UserName: string;
}
