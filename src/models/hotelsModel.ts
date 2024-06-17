import {Request} from 'express'
import { ExtendedRequest } from '../middlewares'

export interface Hotel{
    HotelID: string,
    HotelName: string,
    HotelPrice:number,
    HotelDescription: string,
    isDeleted:number
}

export interface HotelRequest extends ExtendedRequest{
    body:{
        HotelID: string,
        HotelName: string,
        HotelPrice:number,
        HotelDescription: string
    }
    }



export interface deletedHotel{
    HotelID: string,
    HotelName: string,

}
