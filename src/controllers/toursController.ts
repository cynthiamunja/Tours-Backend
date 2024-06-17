import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { ToursRequest, ITour } from '../models/toursModel';
import { sqlConfig } from '../config';

import { DbHelper } from '../DataBaseHelper'

const dbInstance=new DbHelper()
// Get Tours Controller
export const getTours = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
        const result = await pool.request().execute('getTours');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting Tours:', error);
        res.status(500).json({ message: 'couldnt get Tours' });
    } finally {
        pool.close();
    }
};



export const addTours = async (req: ToursRequest, res: Response) => {
    try {
    
        const id = uid();
        
        const Email = req.info?.Email;
        const UserName = req.info?.UserName;

        console.log(Email, UserName)

        const { TourName, TourPrice, TourDescription } = req.body;

    if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){

     await dbInstance.exec("addTours",{ TourID:id, TourPrice, TourName,TourDescription})
        console.log(id)
        // Send a success response
        res.status(201).json({ message: "Tour created successfully" });

}else{
    res.status(201).json({ message: "you are not admin" });
}
       
   
    } catch (error) {
        // Handle errors
        console.error('Error adding tour:', error);
        res.status(500).json({ message: 'Failed to add tour', error });
    }
};

 

export async function getOneTour(request: ToursRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;
        const UserName = request.info?.UserName;


        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

       
        if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){

           const result= await dbInstance.exec("getOneTour",{ TourID:id})
               console.log(id)
               const tour = result.recordset[0] as ToursRequest;

        if (tour) {
            console.log(Email);
            return response.status(200).json(tour);
        }

        return response.status(404).json({ message: "Booking not found" });

       }else{
           response.status(201).json({ message: "you are not admin" });
       }
        return response.status(404).json({ message: "tour not found" });

    } catch (error) {
        console.error('Error fetching tour:', error);
        response.status(500).send({ message: 'failed to fetch tour', error });
    }
}

export async function deleteTour(request: ToursRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;
        const UserName = request.info?.UserName;
    

        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

        // Check if the tour is already deleted
        const tour = (await dbInstance.exec("getOneTour", { TourID: id })).recordset[0]  as ITour;
        if (tour.isDeleted === 1) {
            return response.status(400).json({ message: "Tour already deleted" });
        }

        if (Email === process.env.ADMINEMAIL && UserName === "admin") {
            await dbInstance.exec("deleteTour", { TourID: id });
            console.log(id);
            // Send a success response
            return response.status(201).json({ message: "Tour deleted successfully" });
        } else {
            return response.status(403).json({ message: "You are not admin" });
        }
    } catch (error) {
        console.error('Error deleting tour:', error);
        return response.status(500).send({ message: 'Failed to delete tour', error });
    }
}


export async function updateTour(request: ToursRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;
        const UserName = request.info?.UserName;

        const {TourName,TourPrice, TourDescription} =request.body


        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

       
        if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){

            await dbInstance.exec('updateTours',{TourID:id, TourName,TourPrice, TourDescription})
            
            return response.status(200).json({message:"Tour updated "})
       
        }else{
           response.status(201).json({ message: "you are not admin" });
       }
        return response.status(404).json({ message: "tour not found" });

    } catch (error) {
        console.error('Error updating tour:', error);
        response.status(500).send({ message: 'failed to update tour', error });
    }
}

    


