const express = require('express');
const router = express.Router();
const vendorRegistrationController = require('../controllers/vendorRegistrationController');
const { authenticateToken } = require('../middleware/auth');

// Multi-step vendor registration
router.post('/register/step1/:vendorId', authenticateToken, vendorRegistrationController.saveStep1);
router.post('/register/step2/:vendorId', authenticateToken, vendorRegistrationController.saveStep2);
router.post('/register/step3/:vendorId', authenticateToken, vendorRegistrationController.saveStep3);
router.post('/register/step4/:vendorId', authenticateToken, vendorRegistrationController.saveStep4);
router.post('/register/step5/:vendorId', authenticateToken, vendorRegistrationController.saveStep5);

// Get vendor registration progress
router.get('/progress/:vendorId', authenticateToken, vendorRegistrationController.getVendorProgress);

module.exports = router;
