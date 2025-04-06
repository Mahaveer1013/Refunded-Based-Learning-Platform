import Wallet from "../models/wallet";

export const findWalletById = async (id) => {
    return await Wallet.findById(id);
};

export const updateWallet = async (id, updateData) => {
    return await Wallet.findByIdAndUpdate(id, updateData, { new: true });
};

export const lockBalance = async (id, amount) => {
    const wallet = await Wallet.findById(id);
    if (!wallet || wallet.balance < amount) {
        throw new Error("Insufficient balance or wallet not found");
    }
    wallet.balance -= amount;
    wallet.locked_balance += amount;
    return await wallet.save();
};

export const freeBalance = async (id, amount) => {
    const wallet = await Wallet.findById(id);
    if (!wallet || wallet.locked_balance < amount) {
        throw new Error("Insufficient locked balance or wallet not found");
    }
    wallet.locked_balance -= amount;
    wallet.balance += amount;
    return await wallet.save();
};