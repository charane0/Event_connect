const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_default');

exports.initiatePayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const payment = new Payment({
      bookingId,
      customerId: req.user.id,
      vendorId: booking.vendorId,
      amount: amount || booking.advanceAmount,
      paymentMethod,
      status: 'pending',
    });

    // For Stripe payments, create a payment intent
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            bookingId: bookingId.toString(),
            paymentId: payment._id?.toString(),
          },
        });

        payment.stripePaymentIntentId = paymentIntent.id;
        payment.status = 'processing';
      } catch (stripeError) {
        payment.errorMessage = stripeError.message;
        payment.status = 'failed';
      }
    }

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      payment,
      clientSecret: paymentIntentId ? (await stripe.paymentIntents.retrieve(paymentIntent.id)).client_secret : null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { stripePaymentIntentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Verify payment with Stripe if applicable
    if (stripePaymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        payment.status = 'completed';
        payment.stripeChargeId = paymentIntent.latest_charge;

        // Update booking payment status
        const booking = await Booking.findById(payment.bookingId);
        booking.paymentStatus = 'partial';
        booking.status = 'confirmed';
        await booking.save();
      } else {
        payment.status = 'failed';
        payment.errorMessage = `Stripe payment status: ${paymentIntent.status}`;
      }
    } else {
      payment.status = 'completed';
    }

    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed',
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ customerId: req.user.id })
      .populate('bookingId', 'bookingId eventDate totalAmount')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { reason } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ message: 'Only completed payments can be refunded' });
    }

    if (payment.stripeChargeId) {
      const refund = await stripe.refunds.create({
        charge: payment.stripeChargeId,
      });

      payment.status = 'refunded';
      payment.refundAmount = payment.amount;
      payment.refundReason = reason;
      payment.refundedAt = Date.now();
    }

    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment refunded',
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const payment = await Payment.findById(paymentIntent.metadata.paymentId);

      if (payment) {
        payment.status = 'completed';
        await payment.save();
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
