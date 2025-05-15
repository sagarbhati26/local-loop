import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import providerRoutes from './routes/providerRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//MongoDB
connectDB();

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));