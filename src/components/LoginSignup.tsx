import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Chrome, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserRole } from '../App';

interface LoginSignupProps {
  userRole: UserRole;
  onLogin: (isNewUser: boolean) => void;
  onBack?: () => void;
}

export default function LoginSignup({ userRole, onLogin, onBack }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50">
      {/* Back Button */}
      {onBack && (
        <div className="w-full max-w-md mb-4">
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
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-orange-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl mb-2 text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500">
            {isLogin ? 'Login' : 'Sign up'} as a {userRole}
          </p>
          {!isLogin && userRole === 'vendor' && (
            <div className="mt-3 bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-sm text-blue-800">
                📝 New vendors go through a verification process
              </p>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
          {/* Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-11 rounded-xl border-gray-200 focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 rounded-xl border-gray-200 focus:border-orange-400"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {/* Login Button */}
          <Button
            onClick={() => onLogin(!isLogin)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all mb-4"
          >
            {isLogin ? 'Login' : (userRole === 'vendor' && !isLogin) ? 'Continue to Registration' : 'Sign Up'}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full rounded-xl py-6 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
