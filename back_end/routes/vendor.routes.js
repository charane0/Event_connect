const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const vendorController = require('../controllers/vendorController');
const vendorOnboardingController = require('../controllers/vendorOnboardingController');

const router = express.Router();

// ===== VENDOR ONBOARDING ROUTES =====
// POST: Submit complete vendor onboarding form
router.post('/onboarding/submit/:vendorId', authenticateToken, vendorOnboardingController.submitVendorOnboarding);

// GET: Get vendor onboarding status
router.get('/onboarding/status/:vendorId', authenticateToken, vendorOnboardingController.getVendorStatus);

// PUT: Update vendor profile
router.put('/profile/update/:vendorId', authenticateToken, vendorOnboardingController.updateVendorProfile);

// ===== LEGACY VENDOR ROUTES =====

// Get all approved vendors (public)
router.get('/', vendorController.getAllVendors);

// Get vendor profile by ID (public)
router.get('/:id', vendorController.getVendorProfile);

// Create vendor profile (vendor only)
router.post(
  '/profile/create',
  authenticateToken,
  authorizeRole('vendor'),
  vendorController.createVendorProfile
);

// Get current vendor profile
router.get('/profile/me', authenticateToken, authorizeRole('vendor'), vendorController.getVendorByUserId);

// Update vendor profile (vendor only)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('vendor'),
  vendorController.updateVendorProfile
);

// Get vendor earnings (vendor only)
router.get('/stats/earnings', authenticateToken, authorizeRole('vendor'), vendorController.getVendorEarnings);

// Get vendor bookings (vendor only)
router.get('/bookings/all', authenticateToken, authorizeRole('vendor'), vendorController.getVendorBookings);

// Update booking status (vendor only)
router.put(
  '/bookings/:bookingId/status',
  authenticateToken,
  authorizeRole('vendor'),
  vendorController.updateBookingStatus
);

module.exports = router;
