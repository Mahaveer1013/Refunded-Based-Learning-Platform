import { configDotenv } from "dotenv";
configDotenv()

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/refunded_based_learning';
export const SECRET_KEY = process.env.SECRET_KEY;
export const FIRST_SUPERUSER = process.env.FIRST_SUPERUSER;
export const FIRST_SUPERUSER_PASSWORD = process.env.FIRST_SUPERUSER_PASSWORD;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const KEY_ID = process.env.KEY_ID;
export const KEY_SECRET = process.env.KEY_SECRET;
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
export const SMTP_USERNAME = process.env.SMTP_USERNAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_SERVER = process.env.SMTP_SERVER;
export const SMTP_PORT = process.env.SMTP_PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;