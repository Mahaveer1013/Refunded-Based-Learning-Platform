import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { FIRST_SUPERUSER, FIRST_SUPERUSER_PASSWORD, FRONTEND_URL, MONGO_URI, PORT } from './src/utils/constants.js';
import authRoutes from './src/routes/auth.js'
import { createUser, findUserByEmail } from './src/repositories/user.js';

const app = express();

app.use(express.json(
    { limit: '50mb' } // Increase the limit to 50mb
));
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const createAdmin = async () => {
    if (FIRST_SUPERUSER && FIRST_SUPERUSER_PASSWORD && !(await findUserByEmail(FIRST_SUPERUSER))) {
        createUser({
            email: FIRST_SUPERUSER,
            password: FIRST_SUPERUSER_PASSWORD,
            phone: '0000000000',
            first_name: 'Admin',
            last_name: 'Admin',
        })
    }
}

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    return res.json({ success: true });
})


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    })
    .finally(() => {
        createAdmin()
    })
    .catch((err) => {
        console.error('Error creating admin user:', err);
    });