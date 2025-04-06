import express from 'express';
import Transaction from '../models/transaction.js';
import { RAZORPAY_WEBHOOK_SECRET } from '../utils/constants.js';
import crypto from 'crypto';
import { findTransactionByPaymentId, findTransactionsByConditions } from '../repositories/transaction.js';

const router = express.Router();

router.post("/razorpay/webhook", async (req, res) => {
    try {
        const secret = RAZORPAY_WEBHOOK_SECRET;

        // Verify the webhook signature
        const signature = req.headers['x-razorpay-signature'];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            return res.status(400).json({ error: 'Invalid webhook signature' });
        }

        const event = req.body.event;
        const payload = req.body.payload;

        if (event === 'payment.captured') {
            const payment = payload.payment.entity;

            // Check if the transaction already exists
            let transaction = await findTransactionsByConditions({ payment_id: payment.id, transaction_type: 'payment' });
            if (!transaction) {
                transaction = await findTransactionsByConditions({ payment_id: payment.order_id, transaction_type: 'payment' });
            };
            if (transaction) {
                // Update the existing transaction
                transaction.status = payment.status;
                transaction.amount = payment.amount;
                transaction.currency = payment.currency;
                transaction.method = payment.method;
                transaction.updatedAt = new Date();
            } else {
                // Create a new transaction
                transaction = new Transaction({
                    paymentId: payment.id,
                    orderId: payment.order_id,
                    status: payment.status,
                    amount: payment.amount,
                    currency: payment.currency,
                    method: payment.method,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }

            await transaction.save();
        }

        if (event === 'refund.processed') {
            const refund = payload.refund.entity;

            // Find the transaction associated with the refund
            const transaction = await findTransactionsByConditions({ payment_id: refund.payment_id, orderId: refund.order_id, transaction_type: });

            if (transaction) {
                // Update the transaction status if the entire amount is refunded
                if (refund.amount === transaction.amount) {
                    transaction.status = 'completed';
                }
                transaction.updatedAt = new Date();
                await transaction.save();
            } else {
                // Create a new transaction for the refund
                const refundTransaction = new Transaction({
                    paymentId: refund.payment_id,
                    orderId: refund.order_id,
                    status: 'completed',
                    amount: refund.amount,
                    currency: refund.currency,
                    method: 'refund',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                await refundTransaction.save();
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error processing Razorpay webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/razorpay/payment-withdraw", async (req, res) => {
    try {
        const { paymentId, amount, reason } = req.body;

        if (!paymentId || !amount || !reason) {
            return res.status(400).json({ error: 'Missing required fields: paymentId, amount, reason' });
        }

        // Find the transaction associated with the payment ID
        const transaction = await findTransactionByPaymentId(paymentId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Check if the refund amount is valid
        if (amount > transaction.amount) {
            return res.status(400).json({ error: 'Refund amount exceeds transaction amount' });
        }

        // Simulate Razorpay refund API call
        const razorpayRefundResponse = {
            id: `rfnd_${Date.now()}`,
            payment_id: paymentId,
            amount: amount,
            currency: transaction.currency,
            status: 'processed',
            reason: reason,
            created_at: new Date(),
        };

        // Save the refund details in the database
        const refundTransaction = new Transaction({
            paymentId: paymentId,
            orderId: transaction.orderId,
            status: 'refund_processed',
            amount: amount,
            currency: transaction.currency,
            method: 'refund',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await refundTransaction.save();

        console.log('Refund processed:', razorpayRefundResponse);

        res.status(200).json({ success: true, refund: razorpayRefundResponse });
    } catch (error) {
        console.error('Error processing refund request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});