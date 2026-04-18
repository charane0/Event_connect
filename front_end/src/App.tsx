import { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Onboarding
import SplashScreen from './components/SplashScreen';
import RoleSelection from './components/RoleSelection';
import LoginSignup from './components/LoginSignup';

// Customer Screens
import CustomerHome from './components/customer/Home';
import SearchFilter from './components/customer/SearchFilter';
import VendorDetail from './components/customer/VendorDetail';
import BookingFlow from './components/customer/BookingFlow';
import PaymentConfirmation from './components/customer/PaymentConfirmation';
import MyBookings from './components/customer/MyBookings';
import ChatList from './components/customer/ChatList';

// Vendor Screens
import VendorOnboarding from './components/vendor/VendorOnboarding';
import VendorPendingApproval from './components/vendor/VendorPendingApproval';
import VendorDashboard from './components/vendor/VendorDashboard';
import ManageBookings from './components/vendor/ManageBookings';
import VendorProfile from './components/vendor/VendorProfile';
import EarningsInsights from './components/vendor/EarningsInsights';
import VendorChatList from './components/vendor/VendorChatList';

export type UserRole = 'customer' | 'vendor';

type Screen =
  | 'splash'
  | 'role-selection'
  | 'login'
  | 'customer-home'
  | 'search'
  | 'vendor-detail'
  | 'booking-flow'
  | 'payment-confirmation'
  | 'my-bookings'
  | 'chat-list'
  | 'vendor-verification'
  | 'vendor-pending-approval'
  | 'vendor-dashboard'
  | 'manage-bookings'
  | 'vendor-profile'
  | 'earnings-insights'
  | 'vendor-chat-list';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isNewVendor, setIsNewVendor] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [vendorData, setVendorData] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentScreen('role-selection');
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLogin = (isNewUser: boolean) => {
    if (userRole === 'customer') {
      setCurrentScreen('customer-home');
    } else {
      // For vendors, check if they're new users signing up
      if (isNewUser) {
        // New vendor - go through 5-step verification
        setIsNewVendor(true);
        const vid = localStorage.getItem('vendorId');
        if (vid) {
          setVendorId(vid);
          setCurrentScreen('vendor-verification');
        }
      } else {
        // Existing vendor - go to dashboard
        setCurrentScreen('vendor-dashboard');
      }
    }
  };

  const handleVendorSelect = (vendor: any) => {
    setSelectedVendor(vendor);
    setCurrentScreen('vendor-detail');
  };

  const handleBookNow = () => {
    setCurrentScreen('booking-flow');
  };

  const handleBookingComplete = () => {
    setCurrentScreen('payment-confirmation');
  };

  return (
    <div className="size-full bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Splash Screen */}
      {currentScreen === 'splash' && (
        <SplashScreen onGetStarted={handleGetStarted} />
      )}

      {/* Role Selection */}
      {currentScreen === 'role-selection' && (
        <RoleSelection 
          onSelectRole={handleSelectRole}
          onBack={() => setCurrentScreen('splash')}
        />
      )}

      {/* Login/Signup */}
      {currentScreen === 'login' && (
        <LoginSignup 
          userRole={userRole} 
          onLogin={handleLogin}
          onBack={() => setCurrentScreen('role-selection')}
        />
      )}

      {/* Customer Screens */}
      {currentScreen === 'customer-home' && (
        <CustomerHome
          onNavigateSearch={() => setCurrentScreen('search')}
          onNavigateBookings={() => setCurrentScreen('my-bookings')}
          onNavigateMessages={() => setCurrentScreen('chat-list')}
          onVendorSelect={handleVendorSelect}
          onBack={() => setCurrentScreen('role-selection')}
        />
      )}

      {currentScreen === 'search' && (
        <SearchFilter
          onBack={() => setCurrentScreen('customer-home')}
          onVendorSelect={handleVendorSelect}
        />
      )}

      {currentScreen === 'vendor-detail' && selectedVendor && (
        <VendorDetail
          vendor={selectedVendor}
          onBack={() => setCurrentScreen('search')}
          onBookNow={handleBookNow}
        />
      )}

      {currentScreen === 'booking-flow' && selectedVendor && (
        <BookingFlow
          vendor={selectedVendor}
          onBack={() => setCurrentScreen('vendor-detail')}
          onComplete={handleBookingComplete}
        />
      )}

      {currentScreen === 'payment-confirmation' && (
        <PaymentConfirmation
          onViewBookings={() => setCurrentScreen('my-bookings')}
          onBackHome={() => setCurrentScreen('customer-home')}
        />
      )}

      {currentScreen === 'my-bookings' && (
        <MyBookings onBack={() => setCurrentScreen('customer-home')} />
      )}

      {currentScreen === 'chat-list' && (
        <ChatList
          onBack={() => setCurrentScreen('customer-home')}
          onChatSelect={(chat) => {
            // Find the vendor based on the chat
            const vendorFromChat = {
              id: chat.id,
              name: chat.vendorName,
              category: chat.vendorCategory,
              rating: 4.8,
              reviews: 245,
              price: '800/plate',
              location: 'Mumbai',
              image: 'https://images.unsplash.com/photo-1680342638943-847f76b7b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjA4MDc1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
              isAvailable: true,
              isVerified: true,
            };
            setSelectedVendor(vendorFromChat);
            setCurrentScreen('vendor-detail');
          }}
        />
      )}

      {/* Vendor Screens */}
      {currentScreen === 'vendor-verification' && vendorId && (
        <VendorOnboarding
          vendorId={vendorId}
          onComplete={(vendor) => {
            setVendorData(vendor);
            setCurrentScreen('vendor-pending-approval');
          }}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'vendor-pending-approval' && (
        <VendorPendingApproval
          vendorData={vendorData}
          onBackToHome={() => setCurrentScreen('splash')}
        />
      )}

      {currentScreen === 'vendor-dashboard' && (
        <VendorDashboard
          onNavigateBookings={() => setCurrentScreen('manage-bookings')}
          onNavigateProfile={() => setCurrentScreen('vendor-profile')}
          onNavigateEarnings={() => setCurrentScreen('earnings-insights')}
          onNavigateMessages={() => setCurrentScreen('vendor-chat-list')}
          onBack={() => setCurrentScreen('role-selection')}
        />
      )}

      {currentScreen === 'manage-bookings' && (
        <ManageBookings onBack={() => setCurrentScreen('vendor-dashboard')} />
      )}

      {currentScreen === 'vendor-profile' && (
        <VendorProfile onBack={() => setCurrentScreen('vendor-dashboard')} />
      )}

      {currentScreen === 'earnings-insights' && (
        <EarningsInsights onBack={() => setCurrentScreen('vendor-dashboard')} />
      )}

      {currentScreen === 'vendor-chat-list' && (
        <VendorChatList onBack={() => setCurrentScreen('vendor-dashboard')} />
      )}
    </div>
  );
}
