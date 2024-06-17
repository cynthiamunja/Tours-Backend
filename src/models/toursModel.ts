import { Request } from 'express';
import { ExtendedRequest } from '../middlewares'

export interface ToursRequest extends ExtendedRequest{
    body: {
        TourName: string;
        TourPrice: number;
        TourDescription:string;
    };
}

export interface ITour{
    TourID:string;
    TourName:string;
}
export interface deletedTour{
    TourID:string;
    TourName:string;
}
