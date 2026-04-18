# Event Connect - Quick Start Guide

## ✅ System Requirements

- Node.js v24.13.1+
- MongoDB v8.2.7
- npm v10+

---

## 🚀 Quick Start (3 Steps)

### **1. Start MongoDB**
```powershell
mongod --dbpath C:\mongodb_data
```

### **2. Start Backend**
```powershell
cd back_end
npm install  # First time only
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB connected
```

### **3. Start Frontend** (in a new terminal)
```powershell
cd front_end
npm install  # First time only
npm run dev
```

**Expected output:**
```
VITE v6... ready in ... ms
➜  Local:   http://localhost:3003
```

---

## 📱 Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3003 | Customer & Vendor UI |
| Admin Portal | http://localhost:3003/admin | Vendor approval management |
| Backend API | http://localhost:5000/api | REST API endpoints |
| MongoDB | localhost:27017 | Database |

---

## 🧪 Test Vendor Signup Flow

### **Create Vendor Account:**
1. Go to `http://localhost:3003`
2. Click "Get Started"
3. Select "Vendor"
4. Fill signup form:
   - Name: Any name
   - Email: Any email
   - Password: min 6 chars
   - Business Name: Any business name
   - Business Type: Select from dropdown
5. Click "Create Account"
6. Complete 5-step verification form

### **Expected Result:**
- Vendor profile created in database
- Email sent to vendor (check logs if email not configured)
- Admin notified to review vendor

---

## 👨‍💼 Test Admin Approval Flow

### **First Time - Create Admin:**
1. Go to `http://localhost:3003/admin`
2. Click "Create one" (create admin account)
3. Fill form:
   - Name: Admin name
   - Email: admin@example.com
   - Password: min 6 chars
4. Click "Create Admin Account"

### **Admin Login:**
1. Go to `http://localhost:3003/admin`
2. Enter credentials
3. View pending vendors
4. Click on vendor to review details
5. Click "Approve Vendor" or "Reject Vendor"
6. Vendor receives approval/rejection email

---

## 📦 File Structure

```
Event_connect/
├── back_end/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminAuthController.js
│   │   ├── vendorAdminController.js
│   │   └── vendorRegistrationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vendor.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── admin.routes.js
│   │   └── vendorRegistration.routes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminAuth.js
│   ├── services/
│   │   └── emailService.js
│   ├── .env
│   └── index.js
├── front_end/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginSignup.tsx
│   │   │   ├── vendor/
│   │   │   │   └── VendorVerificationSteps.tsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx
│   │   │       └── AdminDashboard.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── .env.local
│   └── package.json
├── VENDOR_VERIFICATION_GUIDE.md (complete documentation)
└── QUICK_START.md (this file)
```

---

## 🔧 Environment Variables

### **Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_connect
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@eventconnect.com
FRONTEND_URL=http://localhost:3003
```

### **Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📧 Email Configuration (Optional)

To enable actual email sending:

1. Create Gmail app password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated password

2. Update `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

3. Restart backend

---

## 🐛 Troubleshooting

### **Port Already in Use**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### **MongoDB Connection Error**
```powershell
# Check if MongoDB is running
mongod --dbpath C:\mongodb_data

# Or check existing processes
Get-Process mongod
```

### **npm install fails**
```powershell
# Clear cache and retry
npm cache clean --force
npm install
```

### **CORS Errors**
- Ensure `FRONTEND_URL=http://localhost:3003` in backend `.env`
- Frontend and backend must be on specified ports

---

## 📋 API Examples

### **Vendor Signup**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "vendor",
    "businessName": "Johns Catering",
    "businessType": "catering"
  }'
```

### **Step 1 Verification**
```bash
curl -X POST http://localhost:5000/api/vendor-registration/register/step1/[VENDOR_ID] \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Johns Catering",
    "businessType": "catering",
    "businessPhone": "1234567890"
  }'
```

### **Admin Login**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### **Get Pending Vendors**
```bash
curl -X GET http://localhost:5000/api/admin/vendors/pending \
  -H "Authorization: Bearer [ADMIN_TOKEN]"
```

---

## 🎯 Key Features Implemented

✅ **5-Step Vendor Verification**
- Business information
- Owner identification
- Business documents
- Services & pricing
- Bank details

✅ **Admin Portal**
- Login/signup
- View pending vendors
- Approve/reject vendors
- View all vendor details

✅ **Email Notifications**
- Vendor registration confirmation
- Admin notification
- Vendor approval/rejection emails

✅ **Authentication**
- JWT for customers & vendors
- Separate JWT for admins
- Password hashing with bcryptjs
- Token validation

✅ **Database**
- MongoDB with Mongoose
- Separate collections for User, Vendor, Admin
- Full vendor details storage
- Approval workflow tracking

---

## 📚 Documentation

For detailed documentation, see:
- `VENDOR_VERIFICATION_GUIDE.md` - Complete system documentation
- Backend README in `back_end/`
- Frontend README in `front_end/`

---

## 💡 Tips

1. **Use incognito/private browser** when testing multiple accounts
2. **Check browser console** (F12) for frontend errors
3. **Check terminal** for backend logs
4. **MongoDB Compass** (GUI) can be used to view database documents
5. **Postman** can be used to test API endpoints directly

---

## 🚀 You're Ready!

Everything is set up. Start the services and test the vendor verification flow!

```powershell
# Terminal 1: MongoDB
mongod --dbpath C:\mongodb_data

# Terminal 2: Backend
cd back_end
npm run dev

# Terminal 3: Frontend
cd front_end
npm run dev
```

Then open: `http://localhost:3003`

---

**Happy coding! 🎉**
