import express from 'express';
import mongoose from 'mongoose';

//hide the mongoose to git 
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express application
const app = express();

// // Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000!')
        });
    } catch (error) {
        console.log('Error Connecting to MongoDB', error)
    }
}
startServer()
