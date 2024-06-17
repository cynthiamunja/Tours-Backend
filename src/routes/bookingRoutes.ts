import {Router } from 'express'
import {addBooking, getBooking, getOneBooking, updateBooking, deleteBooking} from '../controllers/bookingsController'
import { verifyToken  } from '../middlewares'

const bookingRouter = Router()

bookingRouter.post("",verifyToken, addBooking)
 bookingRouter.get("/:id",verifyToken, getOneBooking)
bookingRouter.get("",verifyToken, getBooking)
bookingRouter.put("/:id",verifyToken,  updateBooking)
bookingRouter.delete("/:id",verifyToken, deleteBooking)
// bookingRouter.get("",getHotel)
//hotelRouter.get("",FilterProducts)
//hotelRouter.get("",GetProductsInRange)



export default bookingRouter