const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const customerController = require('../controllers/customerController');

const router = express.Router();

// Search vendors
router.get(
  '/vendors/search',
  customerController.searchVendors
);

// Get vendor services
router.get(
  '/vendors/:vendorId/services',
  customerController.getVendorServices
);

// Create service (vendor only)
router.post(
  '/services',
  authenticateToken,
  authorizeRole('vendor'),
  customerController.createService
);

// Update service (vendor only)
router.put(
  '/services/:serviceId',
  authenticateToken,
  authorizeRole('vendor'),
  customerController.updateService
);

// Delete service (vendor only)
router.delete(
  '/services/:serviceId',
  authenticateToken,
  authorizeRole('vendor'),
  customerController.deleteService
);

// Filter services
router.get(
  '/services/filter',
  customerController.filterServices
);

// Get vendor reviews
router.get(
  '/vendors/:vendorId/reviews',
  customerController.getVendorReviews
);

// Create review (customer only)
router.post(
  '/reviews',
  authenticateToken,
  authorizeRole('customer'),
  customerController.createReview
);

module.exports = router;
