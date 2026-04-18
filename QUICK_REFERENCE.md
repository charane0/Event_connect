# Event Connect - Quick Reference

## 🚀 Start Your Application

### **One Command (Windows)**
```bash
.\startup.bat
```

### **Manual Start (3 Terminals)**
```bash
Terminal 1: mongod --dbpath C:\mongodb_data
Terminal 2: cd back_end && npm run dev
Terminal 3: cd front_end && npm run dev
```

### **Access App**
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
API:      http://localhost:5000/api
```

---

## 📝 Create Test Account

1. Go to http://localhost:3000
2. Click "Get Started"
3. Select "Customer" or "Vendor"
4. Click "Sign Up"
5. Enter details:
   - Name: `John Doe`
   - Email: `john@test.com`
   - Password: `password123`
   - Phone: (optional)
6. Click "Create Account"

---

## 🔓 Login

1. On login screen, click "Already have an account? Login"
2. Enter:
   - Email: `john@test.com`
   - Password: `password123`
3. Click "Login"

---

## 🗄️ MongoDB

**Start MongoDB:**
```bash
mongod --dbpath C:\mongodb_data
```

**Connect to Database:**
```bash
mongosh
use event_connect
db.users.find()
```

---

## 🔧 Core Files (JavaScript Converted)

| File | Purpose |
|------|---------|
| `vite.config.js` | Build configuration |
| `src/main.jsx` | App entry point |
| `src/App.jsx` | Main component |
| `src/api/client.js` | API calls |
| `src/context/AuthContext.jsx` | Auth state |
| `src/components/LoginSignup.jsx` | Login form |

---

## 📡 API Endpoints

**Auth:**
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

**Vendors:**
```
GET    /api/vendors
GET    /api/vendors/:id
POST   /api/vendors/profile/create
```

**Bookings:**
```
POST   /api/bookings
GET    /api/bookings/customer/all
GET    /api/bookings/:id
```

---

## 🔑 Auth Hook Usage

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  
  // Use in component
}
```

---

## 🧪 Test API with cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456","role":"customer"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not starting | `mkdir C:\mongodb_data` |
| Port 5000 in use | `taskkill /PID <pid> /F` |
| Backend can't connect | Verify mongod is running |
| Login fails | Check MongoDB is running |
| Token expired | Login again for new token |

---

## 📚 Documentation Files

- `COMPLETE_SETUP_SUMMARY.md` - Full setup guide
- `FRONTEND_AUTHENTICATION_GUIDE.md` - Auth details
- `SETUP_GUIDE.md` - Backend setup
- `back_end/README.md` - Backend API docs
- `front_end/README.md` - Frontend info

---

## ✅ What's Working

- ✅ Frontend (JavaScript)
- ✅ Backend API
- ✅ MongoDB Database
- ✅ User Authentication (Signup/Login)
- ✅ JWT Token Management
- ✅ API Routes
- ✅ Context-based Auth State

---

## 📦 Project Structure

```
Event_connect/
├── back_end/          ← Node.js + Express
├── front_end/         ← React (JavaScript)
├── startup.bat        ← One-click start
├── startup.sh         ← Mac/Linux start
├── SETUP_GUIDE.md
├── FRONTEND_AUTHENTICATION_GUIDE.md
└── COMPLETE_SETUP_SUMMARY.md
```

---

## 🎯 Next Features to Build

1. Vendor onboarding
2. Service management
3. Booking system
4. Payment processing
5. Real-time chat
6. Reviews system
7. Earnings dashboard

---

**Last Updated:** April 18, 2026
**Status:** Ready to Use ✅
