const Vendor = require('../models/Vendor');
const User = require('../models/User');
const {
  sendVendorVerificationEmail,
  sendAdminNotificationEmail,
} = require('../services/emailService');

// Save Step 1 - Business Information
exports.saveStep1 = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const {
      businessName,
      businessType,
      businessDescription,
      businessAddress,
      businessPhone,
      businessEmail,
      website,
    } = req.body;

    // Validate required fields
    if (!businessName || !businessType) {
      return res.status(400).json({
        success: false,
        message: 'Business name and type are required',
      });
    }

    // Fetch existing vendor first
    const existingVendor = await Vendor.findById(vendorId);
    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        businessName,
        businessType,
        businessDescription,
        businessAddress,
        businessPhone,
        businessEmail,
        website,
        verificationStep: Math.max(1, existingVendor.verificationStep || 0),
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Step 1 saved successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving Step 1',
      error: error.message,
    });
  }
};

// Save Step 2 - Owner Information
exports.saveStep2 = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { ownerName, ownerPhone, ownerIdType, ownerIdNumber, ownerIdPhoto } =
      req.body;

    // Validate required fields
    if (!ownerName || !ownerIdType || !ownerIdNumber) {
      return res.status(400).json({
        success: false,
        message: 'Owner name, ID type, and ID number are required',
      });
    }

    // Fetch existing vendor first
    const existingVendor = await Vendor.findById(vendorId);
    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        ownerName,
        ownerPhone,
        ownerIdType,
        ownerIdNumber,
        ownerIdPhoto: ownerIdPhoto || existingVendor.ownerIdPhoto,
        verificationStep: Math.max(2, existingVendor.verificationStep || 0),
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Step 2 saved successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving Step 2',
      error: error.message,
    });
  }
};

// Save Step 3 - Business Documents
exports.saveStep3 = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const {
      businessLicenseNumber,
      registrationCertificate,
      taxIdNumber,
      businessRegistrationNumber,
      businessLicense,
    } = req.body;

    // Validate required fields
    if (!businessLicenseNumber || !taxIdNumber) {
      return res.status(400).json({
        success: false,
        message: 'Business license number and tax ID are required',
      });
    }

    // Fetch existing vendor first
    const existingVendor = await Vendor.findById(vendorId);
    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        businessLicenseNumber,
        businessLicense: businessLicense || existingVendor.businessLicense,
        registrationCertificate: registrationCertificate || existingVendor.registrationCertificate,
        taxIdNumber,
        businessRegistrationNumber,
        verificationStep: Math.max(3, existingVendor.verificationStep || 0),
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Step 3 saved successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving Step 3',
      error: error.message,
    });
  }
};

// Save Step 4 - Services & Pricing
exports.saveStep4 = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { services } = req.body;

    // Validate required fields
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one service is required',
      });
    }

    // Fetch existing vendor first
    const existingVendor = await Vendor.findById(vendorId);
    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Convert string prices to numbers
    const processedServices = services.map(service => ({
      serviceName: service.serviceName,
      description: service.description,
      basePrice: parseFloat(service.basePrice) || 0,
      currency: service.currency || 'USD',
    }));

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        services: processedServices,
        verificationStep: Math.max(4, existingVendor.verificationStep || 0),
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Step 4 saved successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving Step 4',
      error: error.message,
    });
  }
};

// Save Step 5 - Bank Details & Complete Verification
exports.saveStep5 = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { bankAccount, portfolioImages } = req.body;

    // Validate required fields
    if (!bankAccount || !bankAccount.accountHolderName || !bankAccount.accountNumber || !bankAccount.bankName) {
      return res.status(400).json({
        success: false,
        message: 'All bank account details are required',
      });
    }

    // Fetch existing vendor
    const existingVendor = await Vendor.findById(vendorId);
    if (!existingVendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Update vendor with final details
    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        bankAccount: {
          accountHolderName: bankAccount.accountHolderName,
          accountNumber: bankAccount.accountNumber,
          routingNumber: bankAccount.routingNumber || '',
          bankName: bankAccount.bankName,
          accountType: bankAccount.accountType || 'checking',
        },
        portfolioImages: portfolioImages && Array.isArray(portfolioImages) ? portfolioImages : (existingVendor.portfolioImages || []),
        verificationStep: 5,
        isVerificationComplete: true,
        approvalStatus: 'pending',
        updatedAt: new Date(),
      },
      { new: true }
    ).populate('userId', 'name email password');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Error updating vendor',
      });
    }

    // Ensure email and password are stored in vendor document
    if (vendor.userId) {
      await Vendor.findByIdAndUpdate(
        vendorId,
        {
          userEmail: vendor.userId.email,
        },
        { new: true }
      );
    }

    // Send verification email to vendor
    try {
      await sendVendorVerificationEmail(
        vendor.userId.email,
        vendor.userId.name,
        vendor._id
      );
    } catch (emailError) {
      console.log('Email sending failed (non-blocking):', emailError.message);
    }

    // Send notification email to all admins
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@eventconnect.com';
      await sendAdminNotificationEmail(adminEmail, vendor.userId.name, vendor._id);
    } catch (emailError) {
      console.log('Admin email sending failed (non-blocking):', emailError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Verification complete! Admin will review your details.',
      vendor: {
        _id: vendor._id,
        businessName: vendor.businessName,
        verificationStep: vendor.verificationStep,
        isVerificationComplete: vendor.isVerificationComplete,
        approvalStatus: vendor.approvalStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving Step 5',
      error: error.message,
    });
  }
};

// Get vendor registration progress
exports.getVendorProgress = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    res.status(200).json({
      success: true,
      vendor: {
        id: vendor._id,
        verificationStep: vendor.verificationStep,
        isVerificationComplete: vendor.isVerificationComplete,
        approvalStatus: vendor.approvalStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor progress',
      error: error.message,
    });
  }
};
