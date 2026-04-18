import { motion } from 'motion/react';
import { User, Briefcase, ChevronLeft } from 'lucide-react';
import { UserRole } from '../App';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  onBack?: () => void;
}

export default function RoleSelection({ onSelectRole, onBack }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50">
      {/* Back Button */}
      {onBack && (
        <div className="w-full max-w-2xl mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      )}

      <motion.div
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl mb-3 text-gray-800">Choose Your Journey</h2>
        <p className="text-gray-500">Select your role to get started</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Customer Card */}
        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => onSelectRole('customer')}
            className="w-full p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-2 text-gray-800">I'm a Customer</h3>
              <p className="text-sm text-gray-500 mb-4">Plan and book your perfect event</p>
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xs text-gray-400 text-center">
                Find vendors • Book services • Celebrate
              </div>
            </div>
          </button>
        </motion.div>

        {/* Vendor Card */}
        <motion.div
          className="relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => onSelectRole('vendor')}
            className="w-full p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-2 text-gray-800">I'm a Vendor</h3>
              <p className="text-sm text-gray-500 mb-4">Grow your event business</p>
              <div className="text-4xl mb-2">💼</div>
              <div className="text-xs text-gray-400 text-center">
                Get bookings • Manage clients • Earn more
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
