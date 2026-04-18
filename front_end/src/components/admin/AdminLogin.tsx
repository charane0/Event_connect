import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [signupName, setSignupName] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('✅ Login successful! Redirecting...');
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(data.token, data.admin);
          }
        }, 1500);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!signupName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupName,
          email,
          password,
          isSuperAdmin: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('✅ Admin account created! Logging in...');
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(data.token, data.admin);
          }
        }, 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Event Connect</h1>
          <p className="text-blue-200">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  disabled={loading}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@eventconnect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin">⟳</div>
                  {isSignup ? 'Creating account...' : 'Logging in...'}
                </span>
              ) : isSignup ? (
                'Create Admin Account'
              ) : (
                'Login to Dashboard'
              )}
            </Button>
          </form>

          {/* Toggle Signup/Login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don't have an admin account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Demo Credentials:</strong> First admin created with email/password. After creation, use those credentials to login.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-sm mt-6">
          Secure admin portal for Event Connect
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
