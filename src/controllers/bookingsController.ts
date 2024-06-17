import { Request, Response } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import { booking, bookingRequest ,deletedbooking} from '../models/bookingsModel';
import { DbHelper } from '../DataBaseHelper'
import { sendBookingEmail } from '../utils/email';



const dbInstance=new DbHelper()

export const addBooking = async (req: bookingRequest, res: Response) => {
    try {
        const id = uid();
        const { HotelBooked, TourBooked } = req.body;

        // Use email and username from token
        const Email = req.info?.Email;
        const UserName = req.info?.UserName;

        if (!Email || !UserName) {
            return res.status(400).json({ message: "Invalid token: missing email or username" });
        }

        await dbInstance.exec("addBooking", { BookingID: id, HotelBooked, TourBooked, UserEmail: Email, UserName });

        await sendBookingEmail(Email, UserName);

        console.log(`Booking ID ${id} created for ${Email}`);

        // Send a success response
        res.status(201).json({ message: "Booking created successfully" });

    } catch (error) {
        // Handle database connection errors
        console.error('Error adding booking:', error);
        
       

        // Handle other errors
        res.status(500).json({ message: 'Failed to add booking', error });
    }
};


export const getBooking = async (req: bookingRequest, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {

        // Use email and username from token
        const Email = req.info?.Email;
        const UserName = req.info?.UserName;

        if (Email === process.env.ADMINEMAIL && UserName=== process.env.ADMINUSERNAME ){

        const result = await (await pool.request().execute('getBookings'));
        
      const booking=  res.status(200).json(result.recordset);

        
        if (booking) {
            console.log(Email);console.log(booking)
       
            return res.status(200).json(booking);
            
 }
        }
    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({ message: 'couldnt get bookings' });
    } finally {
        pool.close();
    }
};

export async function getOneBooking(request: bookingRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;

        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

        const AdminEmail = process.env.ADMINEMAIL as string;
        if (!AdminEmail) {
            return response.status(500).json({ message: "Admin email not configured" });
        }

        const result = await dbInstance.exec("getOneBooking", { BookingID: id, UserEmail: Email, AdminEmail: AdminEmail });
        const booking = result.recordset[0] as booking;

        if (booking) {
            console.log(Email);
            return response.status(200).json(booking);
        }

        return response.status(404).json({ message: "Booking not found" });

    } catch (error) {
        console.error('Error fetching booking:', error);
        response.status(500).send({ message: 'Failed to fetch booking', error });
    }
}



export async function updateBooking(request: bookingRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const thisEmail = request.info?.Email;

        console.log(thisEmail)
        if (!thisEmail) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

        const adminEmail = process.env.ADMINEMAIL as string;

        if (!adminEmail) {
            return response.status(500).json({ message: "Admin email not configured" });
        }

        let userEmail: string | null = null;
        let adminEmailParam: string | null = null;

        if (thisEmail === adminEmail) {
            adminEmailParam = thisEmail;
        } else {
            userEmail = thisEmail;
        }

        const { HotelBooked, TourBooked } = request.body;

        // Handle null values by converting them to empty strings
        const userEmailParam = userEmail ?? '';
        const adminEmailParamFinal = adminEmailParam ?? '';

        await dbInstance.exec("updateBooking", {
            BookingID: id,
            UserEmail: userEmailParam,
            AdminEmail: adminEmailParamFinal,
            TourBooked: TourBooked,
            HotelBooked: HotelBooked
        });
        
        console.log(userEmailParam, adminEmailParam)
       
        return response.status(200).json({ message: "Booking updated successfully" });

         
    } catch (error) {
        console.error('Error updating booking:', error);
        response.status(500).send({ message: 'Failed to update booking', error });
    }
}

export async function deleteBooking(request: bookingRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const thisEmail = request.info?.Email;
        console.log(thisEmail);

        const adminEmail = process.env.ADMINEMAIL as string;

        if (!thisEmail) {
            response.status(400).json({ message: "Invalid token: missing email" });
        } else if (!adminEmail) {
            response.status(500).json({ message: "Admin email not configured" });
        } else {
            const booking = await (await dbInstance.exec("getOneBooking", { BookingID: id, UserEmail: thisEmail, AdminEmail: adminEmail })).recordset[0] as booking;
            if (!booking) {
                response.status(404).json({ message: "Booking not found" });
            } else if (thisEmail !== adminEmail && thisEmail !== booking.UserEmail) {
                response.status(403).json({ message: "Permission denied: You are not authorized to delete this booking" });
            } else if (booking.IsDeleted === 1) {
                response.status(400).json({ message: "Booking already deleted" });
            } else {
                await dbInstance.exec("deleteBooking", {
                    BookingID: id,
                    UserEmail: booking.UserEmail,
                    AdminEmail: adminEmail
                });

                console.log('Deleted Booking:', id);

                response.status(200).json({ message: "Booking deleted successfully" });
            }
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        response.status(500).send({ message: 'Failed to delete booking', error });
    }
}





