import express from 'express';
import {PORT} from './config/env.js';
import { hostname } from 'os';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subsriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.midddleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subsriptionRouter); 


app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, hostname, async () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

 await connectToDatabase();  
}); 

export default app;