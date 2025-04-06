import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middleware/middleware.js';
import Wallet from '../models/wallet.js';
import TokenBlacklist from '../models/tokenBlackList.js';
import { sendPasswordResetEmail } from '../services/emailService.js';
import { SECRET_KEY, TOKEN_EXPIRE_MINUTES } from '../utils/constants.js';
import { createUser, findUserByEmail, findUserById } from '../repositories/user.js';

const router = express.Router();

// Helper functions
const generateToken = (userId) => {
  const token = jwt.sign(
    { sub: userId },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRE_MINUTES + 'm' }
  );
  return { token: token, token_type: 'bearer' };
};

// Register route
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
    body('first_name').isLength({ min: 2, max: 50 }),
    body('phone').isLength({ min: 10, max: 15 }).isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, first_name, last_name, phone } = req.body;

      // Check if user exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ detail: 'Email already registered' });
      }
      const user = await createUser({ email, password, first_name, last_name, phone });

      // Create wallet for user
      const wallet = new Wallet({ user: user._id });
      await wallet.save();

      // Return user without password
      const userResponse = user.toObject();
      delete userResponse.hashed_password;

      res.status(201).json(userResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ detail: error.message });
    }
  }
);

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    // Verify password
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    // Generate tokens
    const tokens = generateToken(user._id);

    // Update last login
    user.last_login = new Date();
    await user.save();

    res.json(tokens);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// Logout route
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Add token to blacklist
    const decoded = jwt.verify(token, SECRET_KEY);
    const blacklistedToken = new TokenBlacklist({
      token,
      expires_at: new Date(decoded.exp * 1000)
    });
    await blacklistedToken.save();

    res.json({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user._id);
    delete user.hashed_password; // Remove password from response
    res.json(user);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// Request password reset
router.post('/request-password-reset',
  body('email').isEmail().normalizeEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ detail: 'User with this email does not exist' });
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { sub: user._id, type: 'password_reset' },
        SECRET_KEY,
        { expiresIn: PASSWORD_RESET_TOKEN_EXPIRE_MINUTES + 'm' }
      );

      // Send email (implementation depends on your email service)
      await sendPasswordResetEmail(user.email, resetToken);

      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ detail: error.message });
    }
  }
);

// Reset password
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('new_password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token, new_password } = req.body;

      // Verify token
      const decoded = jwt.verify(token, SECRET_KEY);
      if (decoded.type !== 'password_reset') {
        return res.status(400).json({ detail: 'Invalid or expired password reset token' });
      }

      const user = await findUserById(decoded.sub);
      if (!user) {
        return res.status(404).json({ detail: 'User not found' });
      }

      // Update password
      user.hashed_password = await bcrypt.hash(new_password, 10);
      await user.save();

      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ detail: 'Invalid or expired password reset token' });
      }
      res.status(500).json({ detail: error.message });
    }
  }
);

export default router;