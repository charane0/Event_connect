import { motion } from 'motion/react';
import { Clock, CheckCircle, Mail, Phone, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface VendorPendingApprovalProps {
  onBackToHome: () => void;
}

export default function VendorPendingApproval({ onBackToHome }: VendorPendingApprovalProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Animated Clock Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(251, 146, 60, 0.4)',
                '0 0 0 30px rgba(251, 146, 60, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            <Clock className="w-16 h-16 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Message */}
      <motion.div
        className="text-center mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl text-gray-900 mb-3">Application Submitted!</h1>
        <p className="text-gray-600">
          Thank you for registering with Swastik. Your vendor application is currently under review.
        </p>
      </motion.div>

      {/* Status Card */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-orange-100 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="inline-block bg-orange-50 rounded-2xl px-6 py-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Application ID</p>
                <p className="text-2xl text-orange-600">#VND{Math.floor(Math.random() * 100000)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">Application Received</h3>
                  <p className="text-xs text-gray-600">Your details have been submitted successfully</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">Under Review</h3>
                  <p className="text-xs text-orange-800">Our team is verifying your information</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl opacity-50">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-600 mb-1">Approval Pending</h3>
                  <p className="text-xs text-gray-500">You'll be notified once approved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline Info */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-blue-100 shadow-md bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              What's Next?
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  1
                </span>
                <span>We'll review your application within <strong>24-48 hours</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  2
                </span>
                <span>Our team will verify your documents and business details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  3
                </span>
                <span>We may contact you if we need additional information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  4
                </span>
                <span>Once approved, you'll receive an <strong>email confirmation</strong> with login credentials</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Options */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-gray-900 mb-4 text-center">Need Help?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-3">
            Our support team is available Mon-Sat, 9 AM - 6 PM
          </p>
        </div>
      </motion.div>

      {/* Back to Home */}
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full rounded-2xl py-6 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      {/* Footer Message */}
      <motion.p
        className="text-center text-gray-500 mt-8 max-w-md text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        🎉 Thank you for choosing Swastik. We're excited to have you onboard!
      </motion.p>

      {/* Demo Note */}
      <motion.div
        className="w-full max-w-md mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <p className="text-xs text-center text-amber-800">
          💡 <strong>Demo Note:</strong> In production, vendors would wait for manual approval. To test the vendor dashboard, select "Login" (not "Sign Up") when choosing vendor role.
        </p>
      </motion.div>
    </div>
  );
}
