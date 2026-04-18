const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
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
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'wallet', 'bank_transfer'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  stripePaymentIntentId: String,
  stripeChargeId: String,
  errorMessage: String,
  refundAmount: Number,
  refundReason: String,
  refundedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate transaction ID
paymentSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
