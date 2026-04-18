const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
  },
  guestCount: {
    type: Number,
  },
  venueAddress: {
    type: String,
  },
  venueCity: String,
  venueState: String,
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  advanceAmount: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid',
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate booking ID
bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingId = `BK-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
