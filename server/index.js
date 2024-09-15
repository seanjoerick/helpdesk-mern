import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import departmentRouter from './routes/department.route.js';
import ticketRouter from './routes/ticket.route.js';
import cookieParser from 'cookie-parser';

// Hide sensitive information
dotenv.config();

// Initialize Express application
const app = express();

// Apply CORS middleware
app.use(cors()); // Apply cors middleware

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Define routes
app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);
app.use('/server/department', departmentRouter);
app.use('/server/ticket', ticketRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

// Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error Connecting to MongoDB:', error);
    }
};
startServer();
