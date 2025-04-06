import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
    try {
        userData.hashed_password = await bcrypt.hash(userData.password, 10);
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error("Error fetching user by email: " + error.message);
    }
};

export const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error("Error fetching user by ID: " + error.message);
    }
};

export const updateUser = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        return user;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        await User.findByIdAndDelete(id);
        return { message: "User deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};