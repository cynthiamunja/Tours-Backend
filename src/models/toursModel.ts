import { Request } from 'express';
import { ExtendedRequest } from '../middlewares'

export interface ToursRequest extends ExtendedRequest{
    body: {
        TourName: string;
        TourPrice: number;
        TourDescription:string;
        isDeleted:number;
    };
}

export interface ITour{
    TourID:string;
    TourName:string;
    isDeleted:number;
}
export interface deletedTour{
    TourID:string;
    TourName:string;
    isDeleted:number;
}
