import express from 'express';

// Initialize Express application
const app = express();

// // Start the server and connect to MongoDB
// const startServer = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO);
//         console.log('Connected to MongoDB');
//         app.listen(3000, () => {
//             console.log('Server is running on port 3000!')
//         });
//     } catch(error) {
//         console.error('Error Connecting to MongoDB', error)
//     }
// }
// startServer()
app.listen(3000, () => {
    console.log('Server is running on port 3000!')
});