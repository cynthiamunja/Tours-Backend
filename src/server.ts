import express, { json } from 'express';
import ToursRouter from './routes/ToursRoute';
import hotelsRouter from './routes/hotelsRoute';
import authRouter from './routes/authRoutes';
import bookingRouter from './routes/bookingRoutes'

const app = express();
app.use(json());
app.use("/Tours", ToursRouter);
app.use("/Hotels", hotelsRouter);
app.use("/auth", authRouter);
app.use("/booking", bookingRouter)
app.listen(3000, () => { console.log("server is running...") });
