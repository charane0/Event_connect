const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Vendor = require('../models/Vendor');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const {
      vendorId,
      serviceId,
      eventDate,
      eventType,
      guestCount,
      venueAddress,
      venueCity,
      venueState,
      specialRequests,
    } = req.body;

    // Get service for pricing
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = new Booking({
      customerId: req.user.id,
      vendorId,
      serviceId,
      eventDate,
      eventType,
      guestCount,
      venueAddress,
      venueCity,
      venueState,
      specialRequests,
      totalAmount: service.price,
      advanceAmount: service.price * 0.2, // 20% advance
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate('vendorId', 'businessName profileImage rating')
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

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('vendorId', 'businessName profileImage rating')
      .populate('serviceId', 'title price description');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const {
      eventDate,
      guestCount,
      venueAddress,
      venueCity,
      venueState,
      specialRequests,
    } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        eventDate,
        guestCount,
        venueAddress,
        venueCity,
        venueState,
        specialRequests,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    if (status) query.status = status;
    if (startDate || endDate) {
      query.eventDate = {};
      if (startDate) query.eventDate.$gte = new Date(startDate);
      if (endDate) query.eventDate.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'name email')
      .populate('vendorId', 'businessName')
      .sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
