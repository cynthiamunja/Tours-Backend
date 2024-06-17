import {Router } from 'express'
import {addHotel,getHotel,getOneHotel,updateHotel,deleteHotel} from '../controllers/hotelsController'
import { verifyToken  } from '../middlewares'

const hotelRouter = Router()

hotelRouter.post("",verifyToken, addHotel)
hotelRouter.get("/:id",verifyToken, getOneHotel)

hotelRouter.put("/:id",verifyToken, updateHotel)
hotelRouter.delete("/:id",verifyToken, deleteHotel)
hotelRouter.get("",getHotel)




export default hotelRouter