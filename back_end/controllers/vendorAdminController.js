const Vendor = require('../models/Vendor');
const User = require('../models/User');
const {
  sendVendorApprovalEmail,
  sendVendorRejectionEmail,
  sendAdminNotificationEmail,
} = require('../services/emailService');

// Get all pending vendors
exports.getPendingVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ approvalStatus: 'pending' })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending vendors',
      error: error.message,
    });
  }
};

// Get all vendors (for viewing full list)
exports.getAllVendors = async (req, res) => {
  try {
    const filter = req.query.status ? { approvalStatus: req.query.status } : {};
    const vendors = await Vendor.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendors',
      error: error.message,
    });
  }
};

// Get single vendor details
exports.getVendorDetails = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).populate(
      'userId',
      'name email phone'
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor details',
      error: error.message,
    });
  }
};

// Approve vendor
exports.approveVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { approvalNotes } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        approvalStatus: 'approved',
        approvedBy: req.admin.id,
        approvedAt: new Date(),
        isVerificationComplete: true,
      },
      { new: true }
    ).populate('userId', 'name email');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Send approval email to vendor
    await sendVendorApprovalEmail(vendor.userId.email, vendor.userId.name);

    res.status(200).json({
      success: true,
      message: 'Vendor approved successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving vendor',
      error: error.message,
    });
  }
};

// Reject vendor
exports.rejectVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rejection reason',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        approvalStatus: 'rejected',
        rejectionReason,
        approvedBy: req.admin.id,
      },
      { new: true }
    ).populate('userId', 'name email');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Send rejection email to vendor
    await sendVendorRejectionEmail(
      vendor.userId.email,
      vendor.userId.name,
      rejectionReason
    );

    res.status(200).json({
      success: true,
      message: 'Vendor rejected successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting vendor',
      error: error.message,
    });
  }
};
