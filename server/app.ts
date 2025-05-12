import dotenv from 'dotenv';
dotenv.config();
import { swaggerUi, specs } from './swaggerConfig';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/user.router';
import serviceRoutes from './src/routes/service.router';
import businessRoutes from './src/routes/business.router';
import eventRoutes from './src/routes/event.router';
import connectDB from './src/models/db.model';

const app: Application = express();
app.use(express.json());
connectDB();
app.use(cookieParser());
const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/business', businessRoutes);
app.use('/events', eventRoutes);


app.get("*", (req:Request, res:Response) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});
const port = Number(process.env.PORT) || 4000;
app.listen(port, '127.0.0.1',() => {
    console.log(`we listening at http://127.0.0.1:${port}`);
})