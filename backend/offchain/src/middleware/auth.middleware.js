const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    res.status(401).json({ detail: 'Token is not valid' });
  }
};