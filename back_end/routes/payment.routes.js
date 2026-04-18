const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Initiate payment
router.post(
  '/initiate',
  authenticateToken,
  paymentController.initiatePayment
);

// Confirm payment
router.post(
  '/:paymentId/confirm',
  authenticateToken,
  paymentController.confirmPayment
);

// Get payment history
router.get(
  '/history',
  authenticateToken,
  paymentController.getPaymentHistory
);

// Refund payment
router.post(
  '/:paymentId/refund',
  authenticateToken,
  paymentController.refundPayment
);

// Webhook for Stripe
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

module.exports = router;
