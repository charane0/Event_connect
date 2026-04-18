const Vendor = require('../models/Vendor');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Submit complete vendor onboarding form
exports.submitVendorOnboarding = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const {
      businessName,
      ownerName,
      category,
      yearsExperience,
      description,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      gstin,
      businessLicense,
      portfolioImages,
      servicesOffered,
      termsAccepted,
    } = req.body;

    // Validate required fields
    if (!businessName || !ownerName || !category || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: businessName, ownerName, category, email, phone',
      });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'Terms and conditions must be accepted',
      });
    }

    // Update vendor with all form data
    const vendorData = {
      businessName,
      ownerName,
      category,
      yearsExperience: Number(yearsExperience) || 0,
      description,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      gstin: gstin || '',
      businessLicense: businessLicense || '',
      portfolioImages: portfolioImages || [],
      servicesOffered: servicesOffered || [],
      termsAccepted,
      isVerificationComplete: true,
      approvalStatus: 'pending',
      verificationStep: 5,
    };

    const vendor = await Vendor.findByIdAndUpdate(vendorId, vendorData, {
      new: true,
      runValidators: true,
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    // Send confirmation email
    try {
      const user = await User.findById(vendor.userId);
      if (user && user.email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password',
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER || 'your-email@gmail.com',
          to: user.email,
          subject: 'Vendor Application Submitted Successfully',
          html: `
            <h2>Application Submitted!</h2>
            <p>Hi ${vendor.ownerName},</p>
            <p>Thank you for registering with Event Connect.</p>
            <p><strong>Application ID:</strong> ${vendor._id}</p>
            <p><strong>Status:</strong> Under Review</p>
            <p>Your application is currently under review and you will be notified once approved.</p>
            <p>Best regards,<br/>Event Connect Team</p>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Email error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
    } catch (emailError) {
      console.log('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      vendor,
      message: 'Application submitted successfully',
      applicationId: vendor._id,
    });
  } catch (error) {
    console.error('Error submitting vendor onboarding:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting application',
    });
  }
};

// Get vendor onboarding status
exports.getVendorStatus = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    res.json({
      success: true,
      vendor: {
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        category: vendor.category,
        yearsExperience: vendor.yearsExperience,
        description: vendor.description,
        phone: vendor.phone,
        email: vendor.email,
        address: vendor.address,
        city: vendor.city,
        state: vendor.state,
        pincode: vendor.pincode,
        gstin: vendor.gstin,
        servicesOffered: vendor.servicesOffered,
        isVerificationComplete: vendor.isVerificationComplete,
        approvalStatus: vendor.approvalStatus,
        verificationStep: vendor.verificationStep,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update vendor profile (for partial updates)
exports.updateVendorProfile = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const updateData = req.body;

    const vendor = await Vendor.findByIdAndUpdate(vendorId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
