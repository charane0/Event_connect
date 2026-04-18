import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Download, Share2, Home, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import confetti from 'canvas-confetti';

interface PaymentConfirmationProps {
  onViewBookings: () => void;
  onBackHome: () => void;
}

export default function PaymentConfirmation({ onViewBookings, onBackHome }: PaymentConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f97316', '#fb923c', '#fdba74'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f97316', '#fb923c', '#fdba74'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                '0 0 0 30px rgba(34, 197, 94, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl text-gray-900 mb-3">Booking Confirmed!</h1>
        <p className="text-gray-600 max-w-md">
          Your event has been successfully booked. We've sent a confirmation to your email.
        </p>
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 mb-8 border border-orange-100"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-6">
          <div className="inline-block bg-orange-50 rounded-2xl px-6 py-3 mb-4">
            <p className="text-sm text-gray-600 mb-1">Booking ID</p>
            <p className="text-2xl text-orange-600">#SWT{Math.floor(Math.random() * 100000)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Vendor</span>
            <span className="text-gray-900">Royal Caterers</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Package</span>
            <span className="text-gray-900">Premium Package</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Date</span>
            <span className="text-gray-900">Nov 15, 2025</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Guests</span>
            <span className="text-gray-900">100 people</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-2xl text-green-600">₹54,000</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Receipt
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="w-full max-w-md space-y-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onViewBookings}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 py-6 rounded-2xl shadow-lg"
        >
          <Calendar className="w-5 h-5 mr-2" />
          View My Bookings
        </Button>
        <Button
          onClick={onBackHome}
          variant="outline"
          className="w-full rounded-2xl py-6 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      {/* Celebration Text */}
      <motion.p
        className="text-center text-gray-500 mt-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🎉 Get ready for an amazing event! The vendor will contact you soon.
      </motion.p>
    </div>
  );
}
