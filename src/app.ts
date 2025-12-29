import express from 'express';
import cors from 'cors';
import tripRoutes from './routes/trip.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', tripRoutes);


app.use(errorHandler);

export default app;
