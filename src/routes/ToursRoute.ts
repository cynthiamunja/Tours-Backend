import { Router } from 'express';
import { addTours, getTours, getOneTour, deleteTour, updateTour } from '../controllers/toursController';
import { verifyToken } from '../middlewares';

const ToursRouter = Router();

// Define routes
ToursRouter.get('/',  getTours);
ToursRouter.post('/', verifyToken, addTours);
ToursRouter.get('/:id', verifyToken, getOneTour);
ToursRouter.delete('/:id', verifyToken, deleteTour);
ToursRouter.put('/:id', verifyToken, updateTour);

export default ToursRouter;
