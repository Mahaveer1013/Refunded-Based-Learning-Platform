import Transaction from "../models/transaction";

export const createTransaction = async (transactionData) => {
    try {
        const transaction = new Transaction(transactionData);
        return await transaction.save();
    } catch (error) {
        throw new Error(`Error creating transaction: ${error.message}`);
    }
};

export const findTransactionByPaymentId = async (paymentId) => {
    try {
        return await Transaction.findOne({ payment_d: paymentId });
    } catch (error) {
        throw new Error(`Error fetching transaction by ID: ${error.message}`);
    }
};

export const findTransactionsByConditions = async (conditions) => {
    try {
        return await Transaction.findOne(conditions);
    } catch (error) {
        throw new Error(`Error fetching transactions by conditions: ${error.message}`);
    }
};

export const updateTransaction = async (transactionId, updateData) => {
    try {
        return await Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating transaction: ${error.message}`);
    }
};

export const deleteTransaction = async (transactionId) => {
    try {
        return await Transaction.findByIdAndDelete(transactionId);
    } catch (error) {
        throw new Error(`Error deleting transaction: ${error.message}`);
    }
};

export const findTransactionById = async (transactionId) => {
    try {
        return await Transaction.findById(transactionId);
    } catch (error) {
        throw new Error(`Error fetching transaction by ID: ${error.message}`);
    }
};

export const findTransactionsByUserId = async (userId) => {
    try {
        return await Transaction.find({ userId });
    } catch (error) {
        throw new Error(`Error fetching transactions by user ID: ${error.message}`);
    }
};

export const findTransactionsByUserEmail = async (userEmail) => {
    try {
        const user = await findUserByEmail(userEmail);
        if (!user) throw new Error("User not found");
        return await Transaction.find({ user: user._id });
    } catch (error) {
        throw new Error(`Error fetching transactions by user email: ${error.message}`);
    }
};

export const updateTransactionStatus = async (transactionId, status) => {
    try {
        return await Transaction.findByIdAndUpdate(
            transactionId,
            { status },
            { new: true }
        );
    } catch (error) {
        throw new Error(`Error updating transaction status: ${error.message}`);
    }
};