const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const vendorAdminController = require('../controllers/vendorAdminController');
const { authenticateAdminToken, authorizeAdminRole } = require('../middleware/adminAuth');

// Admin Authentication
router.post('/signup', adminAuthController.adminSignup);
router.post('/login', adminAuthController.adminLogin);
router.get('/profile', authenticateAdminToken, adminAuthController.getAdminProfile);

// Vendor Management (Admin Only)
router.get(
  '/vendors/pending',
  authenticateAdminToken,
  authorizeAdminRole('admin', 'super_admin'),
  vendorAdminController.getPendingVendors
);

router.get(
  '/vendors',
  authenticateAdminToken,
  authorizeAdminRole('admin', 'super_admin'),
  vendorAdminController.getAllVendors
);

router.get(
  '/vendors/:vendorId',
  authenticateAdminToken,
  authorizeAdminRole('admin', 'super_admin'),
  vendorAdminController.getVendorDetails
);

router.put(
  '/vendors/:vendorId/approve',
  authenticateAdminToken,
  authorizeAdminRole('admin', 'super_admin'),
  vendorAdminController.approveVendor
);

router.put(
  '/vendors/:vendorId/reject',
  authenticateAdminToken,
  authorizeAdminRole('admin', 'super_admin'),
  vendorAdminController.rejectVendor
);

module.exports = router;
