const Vendor = require('../models/Vendor');
const Service = require('../models/Service');
const User = require('../models/User');
const Booking = require('../models/Booking');

exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('userId', 'name email phone profileImage')
      .populate('services');

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVendorProfile = async (req, res) => {
  try {
    const {
      businessName,
      businessDescription,
      businessType,
      businessLicense,
      bankAccount,
      profileImage,
      coverImage,
    } = req.body;

    let vendor = await Vendor.findOne({ userId: req.user.id });

    if (vendor) {
      return res.status(400).json({ message: 'Vendor profile already exists' });
    }

    vendor = new Vendor({
      userId: req.user.id,
      businessName,
      businessDescription,
      businessType,
      businessLicense,
      bankAccount,
      profileImage,
      coverImage,
      approvalStatus: 'pending',
    });

    await vendor.save();

    res.status(201).json({
      success: true,
      message: 'Vendor profile created. Awaiting approval.',
      vendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVendorProfile = async (req, res) => {
  try {
    const { businessName, businessDescription, businessType, profileImage, coverImage, responseTime } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        businessName,
        businessDescription,
        businessType,
        profileImage,
        coverImage,
        responseTime,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Vendor profile updated',
      vendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorByUserId = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id }).populate('services');

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const { businessType, city, rating, search } = req.query;
    let query = { isApproved: true };

    if (businessType) query.businessType = businessType;
    if (city) query['userId.city'] = city;
    if (rating) query.rating = { $gte: rating };
    if (search) query.businessName = { $regex: search, $options: 'i' };

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email phone city profileImage')
      .populate('services')
      .limit(50);

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorEarnings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const completedBookings = await Booking.find({
      vendorId: vendor._id,
      status: 'completed',
    });

    const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const thisMonthEarnings = completedBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        const now = new Date();
        return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, booking) => sum + booking.totalAmount, 0);

    res.status(200).json({
      success: true,
      earnings: {
        totalEarnings,
        thisMonthEarnings,
        completedBookings: completedBookings.length,
        vendor: {
          id: vendor._id,
          businessName: vendor.businessName,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const bookings = await Booking.find({ vendorId: vendor._id })
      .populate('customerId', 'name email phone')
      .populate('serviceId', 'title price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
