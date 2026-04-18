const Service = require('../models/Service');
const Vendor = require('../models/Vendor');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

exports.searchVendors = async (req, res) => {
  try {
    const { businessType, city, rating, search, page = 1, limit = 10 } = req.query;
    let query = { isApproved: true };

    if (businessType) query.businessType = businessType;
    if (search) query.businessName = { $regex: search, $options: 'i' };
    if (rating) query.rating = { $gte: parseInt(rating) };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email phone city profileImage')
      .populate('services')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    const total = await Vendor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: vendors.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      vendors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorServices = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const services = await Service.find({ vendorId });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description, category, price, duration, capacity, images } = req.body;

    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const service = new Service({
      vendorId: vendor._id,
      title,
      description,
      category,
      price,
      duration,
      capacity,
      images: images || [],
    });

    await service.save();

    // Add service to vendor's services array
    vendor.services.push(service._id);
    await vendor.save();

    res.status(201).json({
      success: true,
      message: 'Service created',
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, category, price, duration, capacity, images, availability } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.serviceId,
      {
        title,
        description,
        category,
        price,
        duration,
        capacity,
        images,
        availability,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated',
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Remove from vendor's services
    await Vendor.updateOne(
      { _id: service.vendorId },
      { $pull: { services: service._id } }
    );

    res.status(200).json({
      success: true,
      message: 'Service deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendorReviews = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find({ vendorId })
      .populate('reviewerId', 'name profileImage')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ vendorId });
    const avgRating = await Review.aggregate([
      { $match: { vendorId: require('mongoose').Types.ObjectId(vendorId) } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

    res.status(200).json({
      success: true,
      reviews,
      average: avgRating[0]?.avgRating || 0,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { vendorId, bookingId, rating, title, comment, photos } = req.body;

    // Check if booking is completed
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    const review = new Review({
      bookingId,
      reviewerId: req.user.id,
      vendorId,
      rating,
      title,
      comment,
      photos: photos || [],
    });

    await review.save();

    // Update vendor rating
    const reviews = await Review.find({ vendorId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Vendor.findByIdAndUpdate(vendorId, {
      rating: avgRating,
      reviewCount: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: 'Review created',
      review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.filterServices = async (req, res) => {
  try {
    const { category, priceMin, priceMax, rating, availability, sortBy } = req.query;
    let query = {};

    if (category) query.category = category;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseInt(priceMin);
      if (priceMax) query.price.$lte = parseInt(priceMax);
    }
    if (rating) query.rating = { $gte: parseInt(rating) };
    if (availability) query.availability = availability;

    let sort = { createdAt: -1 };
    if (sortBy === 'price') sort = { price: 1 };
    if (sortBy === 'rating') sort = { rating: -1 };
    if (sortBy === 'newest') sort = { createdAt: -1 };

    const services = await Service.find(query)
      .populate('vendorId', 'businessName profileImage rating')
      .sort(sort)
      .limit(50);

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
