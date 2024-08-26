import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

// Hide sensitive information
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/server/user', userRouter);

// Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000!');
        });
    } catch (error) {
        console.log('Error Connecting to MongoDB:', error);
    }
};

startServer();
