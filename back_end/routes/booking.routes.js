const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Create booking (customer only)
router.post(
  '/',
  authenticateToken,
  authorizeRole('customer'),
  bookingController.createBooking
);

// Get all customer bookings
router.get(
  '/customer/all',
  authenticateToken,
  authorizeRole('customer'),
  bookingController.getCustomerBookings
);

// Get booking by ID
router.get('/:id', authenticateToken, bookingController.getBookingById);

// Update booking (customer only)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('customer'),
  bookingController.updateBooking
);

// Cancel booking (customer only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('customer'),
  bookingController.cancelBooking
);

// Get all bookings (admin only)
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  bookingController.getAllBookings
);

module.exports = router;
