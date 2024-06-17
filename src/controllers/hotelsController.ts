import { Request, Response } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import { Hotel, HotelRequest ,deletedHotel} from '../models/hotelsModel';
import { DbHelper } from '../DataBaseHelper'

const dbInstance=new DbHelper()

export const addHotel = async (req: HotelRequest, res: Response) => {
    try {
    
        const id = uid();
        
        const Email = req.info?.Email;
        const UserName = req.info?.UserName;

        console.log(Email, UserName)

        const { HotelName, HotelDescription, HotelPrice } = req.body;

    if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){

     await dbInstance.exec("addHotel",{ HotelID:id, HotelName, HotelPrice, HotelDescription})
        console.log(id)
//         // Send a success response
        res.status(201).json({ message: "Hotel created successfully" });

}else{
    res.status(201).json({ message: "you are not admin" });
}
       
   
    } catch (error) {
        // Handle errors
        console.error('Error adding tour:', error);
        res.status(500).json({ message: 'Failed to add tour', error });
    }
};




export const getHotel = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
        const result = await pool.request().execute('getHotels');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting hotels:', error);
        res.status(500).json({ message: 'couldnt get getHotels' });
    } finally {
        pool.close();
    }
};


export async function getOneHotel(request: HotelRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;
        const UserName = request.info?.UserName;


        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

       
        if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){

            const hotel= await (await dbInstance.exec("getOneHotel",{ HotelID:id})).recordset[0] as Hotel

       
                   if(hotel && hotel.HotelID){
                      return response.status(200).json(hotel)
                   }
            
                   return response.status(404).json({message:"hotel Not Found"})
            
            
       }else{
           response.status(201).json({ message: "you are not admin" });
       }
        return response.status(404).json({ message: "tour not found" });

    } catch (error) {
        console.error('Error fetching booking:', error);
        response.status(500).send({ message: 'tour to fetch booking', error });
    }
}



export async function updateHotel(request: HotelRequest, response: Response) {
    try {
        const id = request.params.id;
        console.log(id);

        const Email = request.info?.Email;
        const UserName = request.info?.UserName;

        const {HotelName, HotelDescription, HotelPrice} =request.body
           console.log(HotelName);

        if (!Email) {
            return response.status(400).json({ message: "Invalid token: missing email" });
        }

       
        if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){
            const hotel=await( await dbInstance.exec('getOneHotel',{HotelID:id})). recordset[0] as Hotel
            if(hotel && hotel.HotelID){
                          await dbInstance.exec('updateHotel',{HotelID:id, HotelName, HotelDescription, HotelPrice})
                        return response.status(200).json({message:"Hotel updated "})
                
                       }
                
                     return response.status(404).json({message:"Hotel Not Found"})
                
       
        }else{
           response.status(201).json({ message: "you are not admin" });
       }
        return response.status(404).json({ message: "hotel not found" });

    } catch (error) {
        console.error('Error updating tour:', error);
        response.status(500).send({ message: 'failed to update hotel', error });
    }
}


    // export const deleteHotel= async(req:Request<{id:string}>,res:Response)=>{
    //     try {
    //         const thisHotel=await ( await dbInstance.exec('getOneHotel',{HotelID:req.params.id})). recordset[0] as Hotel
        
    //         if(thisHotel && thisHotel.HotelID){
    //             await dbInstance.exec('deleteHotel',{HotelID:req.params.id})
    //             return res.status(200).json({message:"hotel Deleted "})
    //         }
    
    //         return res.status(404).json({message:"hotel Not Found"})
    
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    //     }

    export async function deleteHotel(request: HotelRequest, response: Response) {
        try {
            const id = request.params.id;
            console.log(id);
    
            const Email = request.info?.Email;
            const UserName = request.info?.UserName;
    
    
            if (!Email) {
                return response.status(400).json({ message: "Invalid token: missing email" });
            }
    
           
            if (Email === process.env.ADMINEMAIL && UserName=== "admin" ){
    
                const thisHotel=await ( await dbInstance.exec('getOneHotel',{HotelID:id})). recordset[0] as Hotel
        
            if(thisHotel && thisHotel.HotelID){
                if (thisHotel.isDeleted === 1) {
                    return response.status(400).json({ message: "hotel already deleted" });
                }
                await dbInstance.exec('deleteHotel',{HotelID:id})
                return response.status(200).json({message:"hotel Deleted "})
           }else{
               response.status(201).json({ message: "hotel not found" });
           } 
       
           // return response.status(404).json({ message: "hotel not found" });
            }
    
        } catch (error) {
            console.error('Error deleting hotel:', error);
            response.status(500).send({ message: 'failed to delete hotel', error });
        }
    }