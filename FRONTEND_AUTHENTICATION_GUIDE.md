# Event Connect - Frontend JavaScript Conversion Guide

## ✅ Completed Changes

### 1. **Configuration Files Converted to JavaScript**
- `vite.config.js` - Vite build configuration
- `jsconfig.json` - JavaScript configuration
- `src/config/api.config.js` - API configuration
- `index.html` - Updated to reference main.jsx

### 2. **Core Files Converted to JavaScript**
- `src/main.jsx` - Application entry point
- `src/App.jsx` - Main application component with dynamic routing
- `src/components/LoginSignup.jsx` - Authentication form with dynamic login/signup

### 3. **API & Utilities**
- `src/api/client.js` - Complete API client for backend communication
- `src/utils/api.utils.js` - Authentication utilities and helpers

### 4. **Authentication Context**
- `src/context/AuthContext.jsx` - React Context for global auth state
  - `useAuth()` hook for accessing auth state in components
  - `AuthProvider` component wrapper

## 🗄️ Database Connection

### MongoDB Setup
- **Database**: `event_connect`
- **Connection String**: `mongodb://localhost:27017/event_connect`
- **Collections Created On First Use**:
  - `users` - Stores customer and vendor accounts
  - `vendors` - Vendor profiles and business info
  - `services` - Services offered by vendors
  - `bookings` - Booking records
  - `payments` - Payment transactions
  - `chatrooms` - Chat conversations
  - `reviews` - Customer reviews

## 🔐 Authentication Flow

### Login/Signup Process

1. **User lands on app** → Shows splash screen
2. **Clicks "Get Started"** → Role selection (Customer/Vendor)
3. **Selects Role** → Login/Signup screen
4. **Enters Credentials**:
   - **Login**: Email + Password
   - **Signup**: Name + Email + Password + Phone (optional)

5. **Backend Validates**:
   - Checks if user exists
   - Hashes password with bcryptjs
   - Creates JWT token

6. **Token Storage**:
   - JWT token stored in `localStorage`
   - Token sent in every API request header
   - `Authorization: Bearer {token}`

7. **Auto-Login on Refresh**:
   - App checks localStorage for token on mount
   - Verifies token validity
   - Restores user session automatically

### User Data Structure
```javascript
{
  id: "user_id",
  name: "User Name",
  email: "user@example.com",
  phone: "+1234567890",
  role: "customer" | "vendor",
  profileImage: "url",
  address: "street address",
  city: "city",
  state: "state",
  zipCode: "12345"
}
```

## 🚀 Running the Application

### Terminal 1: MongoDB
```bash
mongod --dbpath C:\mongodb_data
```

### Terminal 2: Backend
```bash
cd back_end
npm run dev
# Runs on http://localhost:5000
```

### Terminal 3: Frontend
```bash
cd front_end
npm run dev
# Runs on http://localhost:3000
```

## 📡 API Endpoints for Authentication

### Authentication Endpoints
```
POST   /api/auth/signup        - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (requires token)
POST   /api/auth/verify-token  - Verify JWT token
PUT    /api/auth/profile       - Update user profile
```

## 📝 Using Authentication in Components

### Import the Auth Hook
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  
  // Use auth functions and state
}
```

### Available Auth Functions

**Login**
```javascript
const { login } = useAuth();
const result = await login(email, password);
// Returns: { success: true, user } or { success: false, error }
```

**Signup**
```javascript
const { signup } = useAuth();
const result = await signup(name, email, password, role, phone);
// Returns: { success: true, user } or { success: false, error }
```

**Logout**
```javascript
const { logout } = useAuth();
await logout();
```

**Update Profile**
```javascript
const { updateProfile } = useAuth();
const result = await updateProfile({ phone, address, city, state, zipCode });
```

## 📦 Wrapping App with AuthProvider

In your main entry file (already done):
```javascript
import { AuthProvider } from './context/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

## 🔄 Frontend to Backend Flow

1. **User Signs Up**
   ```
   Frontend: authAPI.signup(name, email, password, role)
   ↓
   Backend: POST /api/auth/signup
   ↓
   MongoDB: Create User document
   ↓
   Response: { token, user }
   ↓
   Frontend: Store token, Update AuthContext
   ```

2. **User Logs In**
   ```
   Frontend: authAPI.login(email, password)
   ↓
   Backend: POST /api/auth/login
   ↓
   MongoDB: Find User, verify password
   ↓
   Response: { token, user }
   ↓
   Frontend: Store token, Update AuthContext
   ```

3. **Verify Session**
   ```
   Frontend: authAPI.getCurrentUser()
   ↓
   Backend: GET /api/auth/me (with Bearer token)
   ↓
   MongoDB: Validate token, get user
   ↓
   Response: { user }
   ```

## 🛠️ Remaining TypeScript Files

Components are still in `.tsx` format:
- `src/components/**/*.tsx`
- `src/components/ui/**/*.tsx`

These will be converted to `.jsx` incrementally or can be converted all at once. Vite/Babel handles JSX in both .tsx and .jsx files during development.

## ⚙️ Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/event_connect
JWT_SECRET=dev_secret_key_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### "Cannot find module" errors
- Ensure imports use correct file extensions (.js, .jsx)
- Check vite.config.js has proper resolve.extensions

### MongoDB Connection Error
- Verify mongod is running: `mongod --dbpath C:\mongodb_data`
- Check MONGODB_URI in .env

### Authentication Not Working
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for API errors
- Verify backend is running and connected to MongoDB

### Token Expired
- Token expires after 7 days by default
- Automatically logs out user
- Redirects to login screen

## 📚 Next Steps

1. ✅ Frontend converted to JavaScript (core files)
2. ✅ MongoDB connected to backend
3. ✅ Authentication system implemented
4. ⏳ Convert remaining .tsx component files to .jsx
5. ⏳ Implement vendor onboarding with database
6. ⏳ Add payment processing
7. ⏳ Implement real-time chat
8. ⏳ Add image upload functionality

---

**Status**: Frontend Authentication Ready ✅
**Database**: MongoDB Connected ✅
**Backend**: API Running ✅
