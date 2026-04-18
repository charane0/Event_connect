const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['customer', 'vendor']).withMessage('Invalid role'),
  ],
  handleValidationErrors,
  authController.signup
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidationErrors,
  authController.login
);

// Get current user
router.get('/me', authenticateToken, authController.getCurrentUser);

// Verify token
router.post('/verify-token', authenticateToken, authController.verifyToken);

// Update profile
router.put('/profile', authenticateToken, authController.updateProfile);

module.exports = router;
