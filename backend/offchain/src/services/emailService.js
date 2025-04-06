import nodemailer from 'nodemailer';
import { FRONTEND_URL, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVER, SMTP_USERNAME } from '../utils/constants.js';

const transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    }
});

export const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
        from: SMTP_USERNAME,
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};