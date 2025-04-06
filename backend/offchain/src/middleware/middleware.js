import jwt from 'jsonwebtoken';
import TokenBlacklist from '../models/tokenBlackList.js';
import { SECRET_KEY } from '../utils/constants.js';
import { findUserById } from '../repositories/user.js';

export default async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ detail: 'No token, authorization denied' });
    }

    // Check if token is blacklisted
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ detail: 'Token has been invalidated' });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = findUserById(decoded.sub);
    if (!user) {
      return res.status(401).json({ detail: 'Token is not valid' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ detail: 'Token is not valid' });
  }
};