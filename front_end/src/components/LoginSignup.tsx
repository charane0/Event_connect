import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Chrome, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    businessType: '',
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!formData.password.trim()) {
      setError('Please enter a password');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Vendor-specific validation
    if (userRole === 'vendor') {
      if (!formData.businessName?.trim()) {
        setError('Please enter your business name');
        return;
      }
      if (!formData.businessType) {
        setError('Please select a business type');
        return;
      }
    }

    setLoading(true);

    try {
      const signupData: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userRole,
        phone: formData.phone || null,
      };

      // Add vendor-specific fields
      if (userRole === 'vendor') {
        signupData.businessName = formData.businessName;
        signupData.businessType = formData.businessType;
      }

      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed. Please try again.');
        return;
      }

      // Success - save token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // If vendor, save vendor ID for verification flow
      if (userRole === 'vendor' && data.vendor) {
        localStorage.setItem('vendorId', data.vendor._id);
        localStorage.setItem('vendorStatus', 'pending_verification');
      }
      
      setSuccess('✅ Account created successfully! Redirecting...');
      
      // Call onLogin with true indicating new user
      setTimeout(() => {
        onLogin(true);
      }, 1500);
    } catch (err: any) {
      setError('Network error: ' + (err.message || 'Please check your connection'));
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid email or password');
        return;
      }

      // Success - save token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setSuccess('✅ Login successful! Redirecting...');
      
      // Call onLogin with false indicating existing user
      setTimeout(() => {
        onLogin(false);
      }, 1500);
    } catch (err: any) {
      setError('Network error: ' + (err.message || 'Please check your connection'));
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4 mb-6">
            {/* Name field - only for signup */}
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-gray-700 mb-2">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="pl-11 rounded-xl border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="pl-11 rounded-xl border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Phone field - only for signup */}
            {!isLogin && (
              <div>
                <Label htmlFor="phone" className="text-gray-700 mb-2">Phone (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-orange-400"
                />
              </div>
            )}

            {/* Vendor-specific fields */}
            {!isLogin && userRole === 'vendor' && (
              <>
                <div>
                  <Label htmlFor="businessName" className="text-gray-700 mb-2">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Your Business Name"
                    value={formData.businessName || ''}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="rounded-xl border-gray-200 focus:border-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-gray-700 mb-2">Business Type</Label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType || ''}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        businessType: e.target.value
                      }));
                    }}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white"
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="catering">Catering</option>
                    <option value="decoration">Decoration</option>
                    <option value="photography">Photography</option>
                    <option value="venue">Venue</option>
                    <option value="music">Music</option>
                    <option value="planning">Planning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-orange-600 hover:text-orange-700">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{isLogin ? 'Login' : 'Sign Up'}</span>
              )}
            </Button>
          </form>

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
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full rounded-xl py-6 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
