import axios from 'axios';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '../utils/constants.js';

export async function processRazorpayRefund(paymentId, amount) {
    const refundPayload = {
        amount: amount, 
    };

    const auth = {
        username: RAZORPAY_KEY_ID,
        password: RAZORPAY_KEY_SECRET
    };

    try {
        const response = await axios.post(
            `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
            refundPayload,
            { auth }
        );

        return response.data;
    } catch (error) {
        console.error('Razorpay refund error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.description || 'Failed to process refund');
    }
}
