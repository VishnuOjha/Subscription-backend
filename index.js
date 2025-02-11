import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/env.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import connectDB from './database/db.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddlware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


const app = express();

app.use(express.json());    
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());
app.use(arcjetMiddlware)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB()
})