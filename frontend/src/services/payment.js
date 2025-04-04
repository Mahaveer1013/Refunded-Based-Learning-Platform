// Mock payment service that returns dummy data
let paymentCounter = 1;

/**
 * Simulates creating a payment order
 * @param {number} amount - Payment amount in INR
 * @returns {Promise<Object>} Mock order details
 */
export const createOrder = async (amount) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                order_id: `order_${Date.now()}_${paymentCounter++}`,
                amount: amount,
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                status: 'created'
            });
        }, 500); // Simulate network delay
    });
};

/**
 * Simulates payment verification
 * @param {string} paymentId - Mock payment ID
 * @param {string} orderId - Mock order ID
 * @param {string} signature - Mock signature
 * @returns {Promise<Object>} Mock verification result
 */
export const verifyPayment = async (paymentId, orderId, signature) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                paymentId: paymentId || `pay_${Date.now()}`,
                orderId: orderId || `order_${Date.now()}`,
                signature: signature || `sig_${Date.now()}`,
                status: 'verified',
                timestamp: new Date().toISOString()
            });
        }, 800); // Simulate verification delay
    });
};

/**
 * Simulates Razorpay checkout
 * @param {Object} options - Checkout options
 * @returns {Promise<Object>} Mock payment response
 */
export const openRazorpayCheckout = (options) => {
    return new Promise((resolve, reject) => {
        // Simulate opening payment modal
        console.log('Opening Razorpay checkout with:', options);

        setTimeout(() => {
            // 80% chance of success, 20% chance of failure for testing
            if (Math.random() > 0.2) {
                resolve({
                    razorpay_payment_id: `pay_${Date.now()}`,
                    razorpay_order_id: options.order_id || `order_${Date.now()}`,
                    razorpay_signature: `sig_${Date.now()}`,
                    status: 'captured'
                });
            } else {
                reject(new Error('Payment failed - user cancelled'));
            }
        }, 1500); // Simulate payment processing time
    });
};

// Additional mock functions for testing different scenarios
export const mockPaymentService = {
    /**
     * Simulates successful payment flow
     */
    async successfulPayment(amount = 1000) {
        const order = await createOrder(amount);
        const payment = await openRazorpayCheckout({
            key: 'mock_key',
            amount: order.amount * 100,
            currency: order.currency,
            order_id: order.order_id
        });
        return verifyPayment(
            payment.razorpay_payment_id,
            payment.razorpay_order_id,
            payment.razorpay_signature
        );
    },

    /**
     * Simulates failed payment flow
     */
    async failedPayment(amount = 1000) {
        const order = await createOrder(amount);
        await openRazorpayCheckout({
            key: 'mock_key',
            amount: order.amount * 100,
            currency: order.currency,
            order_id: order.order_id,
            forceFail: true // Special flag for testing failure
        });
    }
};