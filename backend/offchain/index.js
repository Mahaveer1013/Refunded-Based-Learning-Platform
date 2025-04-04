import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { FRONTEND_URL, MONGO_URI, PORT } from './src/utils/constants';

const app = express();

app.use(express.json());
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use()

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
