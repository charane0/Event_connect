# Event Connect - Complete 5-Step Vendor Verification System

## 🎯 Overview

This document explains the complete vendor verification workflow implemented in Event Connect. The system includes:

1. **5-Step Vendor Registration** (Frontend)
2. **Backend Verification API** 
3. **Admin Portal** for approval/rejection
4. **Email Notifications** at key stages
5. **Database Storage** of all vendor details

---

## 📋 Complete User Journey

### **STEP 1: Customer/Vendor Chooses Role**
- User clicks "Get Started" on splash screen
- Selects either "Customer" or "Vendor"
- If vendor, redirected to LoginSignup component

### **STEP 2: Vendor Signup**
**File:** `front_end/src/components/LoginSignup.tsx`

#### Fields:
- Name (required)
- Email (required)
- Password (required, min 6 chars)
- Phone (optional)
- **Business Name** (required for vendors)
- **Business Type** (required: catering, decoration, photography, venue, music, planning, other)

#### Process:
```
1. User fills signup form
2. Frontend validates all fields
3. POST to http://localhost:5000/api/auth/signup
4. Backend creates:
   - User document in MongoDB (with hashed password)
   - Vendor profile document (with verificationStep=0)
5. JWT token generated and returned
6. Frontend stores:
   - authToken → localStorage
   - user → localStorage
   - vendorId → localStorage (IMPORTANT - used for verification)
   - vendorStatus = "pending_verification" → localStorage
7. Component calls onLogin(true) → redirects to vendor verification
```

---

### **STEP 3: 5-Step Vendor Verification Process**

**File:** `front_end/src/components/vendor/VendorVerificationSteps.tsx`

This is a **multi-step form** with progress tracking. Each step saves to backend separately.

#### **Step 1: Business Information**
**Saved to:** `POST /api/vendor-registration/register/step1/:vendorId`

Fields collected:
- Business Name
- Business Type (dropdown)
- Business Description
- Business Address (street, city, state, zipCode, country)
- Business Phone
- Business Email
- Website

Database storage:
```javascript
{
  businessName: "...",
  businessType: "catering",
  businessDescription: "...",
  businessAddress: {
    street: "...",
    city: "...",
    state: "...",
    zipCode: "..."
  },
  businessPhone: "...",
  businessEmail: "...",
  website: "...",
  verificationStep: 1
}
```

---

#### **Step 2: Owner Information**
**Saved to:** `POST /api/vendor-registration/register/step2/:vendorId`

Fields collected:
- Owner Full Name
- Owner Phone
- ID Type (passport, driver's license, national ID, other)
- ID Number
- **Owner ID Photo** (image upload, stored as base64)

Database storage:
```javascript
{
  ownerName: "...",
  ownerPhone: "...",
  ownerIdType: "passport",
  ownerIdNumber: "...",
  ownerIdPhoto: "data:image/png;base64,...",
  verificationStep: 2
}
```

---

#### **Step 3: Business Documents**
**Saved to:** `POST /api/vendor-registration/register/step3/:vendorId`

Files/Documents collected:
- Business License Number
- **Business License Photo** (image upload)
- **Registration Certificate Photo** (image upload)
- Tax ID Number
- Business Registration Number

Database storage:
```javascript
{
  businessLicenseNumber: "...",
  businessLicense: "data:image/png;base64,...",
  registrationCertificate: "data:image/png;base64,...",
  taxIdNumber: "...",
  businessRegistrationNumber: "...",
  verificationStep: 3
}
```

---

#### **Step 4: Services & Pricing**
**Saved to:** `POST /api/vendor-registration/register/step4/:vendorId`

Services array collected:
```javascript
[
  {
    serviceName: "Wedding Catering (100 people)",
    description: "Full meal service for 100 guests",
    basePrice: 5000,
    currency: "USD"
  },
  {
    serviceName: "Party Decoration",
    description: "Theme-based decoration setup",
    basePrice: 2000,
    currency: "USD"
  }
]
```

Database storage:
```javascript
{
  services: [
    { serviceName: "...", description: "...", basePrice: 5000, currency: "USD" },
    { serviceName: "...", description: "...", basePrice: 2000, currency: "USD" }
  ],
  verificationStep: 4
}
```

---

#### **Step 5: Bank Details & Portfolio**
**Saved to:** `POST /api/vendor-registration/register/step5/:vendorId`

Bank account fields:
- Account Holder Name (required)
- Bank Name (required)
- Account Number (required, displayed as password field)
- Routing Number (optional)
- Account Type (checking/savings)

Portfolio images:
- Multiple image uploads (optional)
- Stored as base64 array

Database storage:
```javascript
{
  bankAccount: {
    accountHolderName: "...",
    bankName: "...",
    accountNumber: "...",
    routingNumber: "...",
    accountType: "checking"
  },
  portfolioImages: ["data:image/png;base64,...", "..."],
  verificationStep: 5,
  isVerificationComplete: true
}
```

#### **On Step 5 Completion:**
✅ Email sent to vendor:
```
Subject: "Event Connect - Vendor Registration Submitted"
Body: "Thank you for submitting your vendor registration. 
       Admin will review and you'll be notified within 24-48 hours."
```

✅ Email sent to admin:
```
Subject: "📋 New Vendor Registration Pending Review"
Body: "A new vendor [Name] has submitted registration for review."
Link to: http://localhost:3003/admin
```

---

## 🔐 Admin Approval Workflow

### **Admin Login**
**File:** `front_end/src/components/admin/AdminLogin.tsx`

#### Features:
- Toggle between Login/Signup modes
- Create first admin account (signup)
- Login with email/password
- Stores adminToken in localStorage
- Redirects to AdminDashboard on success

#### Backend Endpoints:
- `POST /api/admin/signup` - Create admin account
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (requires auth)

---

### **Admin Dashboard**
**File:** `front_end/src/components/admin/AdminDashboard.tsx`

#### Main Features:

**1. Pending Vendors List**
- Shows all vendors with `approvalStatus: "pending"`
- Displays:
  - Vendor name & business name
  - Email & phone
  - Business type (tag)
  - Creation date
  - Verification step progress
  - Verification completion status

**2. Vendor Details Panel**
- Click any vendor to view full details
- Shows:
  - Owner information
  - Business information
  - Documents submitted
  - Services & pricing
  - Verification status

**3. Approval/Rejection Actions**
- **Approve Button:**
  - Sends: `PUT /api/admin/vendors/:vendorId/approve`
  - Updates: `approvalStatus = "approved"`, `approvedBy = adminId`, `approvedAt = now`
  - Sends approval email to vendor
  - Refreshes vendor list

- **Reject Button:**
  - Sends: `PUT /api/admin/vendors/:vendorId/reject`
  - Requires rejection reason (textarea)
  - Updates: `approvalStatus = "rejected"`, `rejectionReason = ...`
  - Sends rejection email to vendor
  - Refreshes vendor list

---

## 🗄️ Database Schema

### **Vendor Model** (Updated)
```javascript
{
  userId: ObjectId,                    // Reference to User
  
  // Step 1
  businessName: String,
  businessType: String,
  businessDescription: String,
  businessAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  businessPhone: String,
  businessEmail: String,
  website: String,
  
  // Step 2
  ownerName: String,
  ownerPhone: String,
  ownerIdType: String,                 // passport|drivers_license|national_id|other
  ownerIdNumber: String,
  ownerIdPhoto: String,               // base64 image
  
  // Step 3
  businessLicense: String,            // base64 image
  businessLicenseNumber: String,
  registrationCertificate: String,   // base64 image
  taxIdNumber: String,
  businessRegistrationNumber: String,
  
  // Step 4
  services: [{
    serviceName: String,
    description: String,
    basePrice: Number,
    currency: String
  }],
  
  // Step 5
  bankAccount: {
    accountHolderName: String,
    accountNumber: String,
    routingNumber: String,
    bankName: String,
    accountType: String              // checking|savings
  },
  portfolioImages: [String],         // base64 images
  
  // Verification Status
  verificationStep: Number,           // 0-5
  isVerificationComplete: Boolean,
  approvalStatus: String,            // pending|approved|rejected
  approvalReason: String,
  approvedBy: ObjectId,              // Reference to Admin
  approvedAt: Date,
  rejectionReason: String,
  
  // Performance
  rating: Number,
  reviewCount: Number,
  totalEarnings: Number,
  completedBookings: Number,
  responseTime: Number,
  availability: String,              // available|busy|unavailable
  
  // Metadata
  createdAt: Date,
  updatedAt: Date
}
```

### **Admin Model** (New)
```javascript
{
  name: String,              // required
  email: String,             // required, unique, lowercase
  password: String,          // hashed with bcryptjs
  role: String,              // "admin" | "super_admin"
  isSuperAdmin: Boolean,     // default: false
  phone: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📧 Email Notifications

### **Three Email Stages:**

#### **1. Vendor Registration Submission Email**
- **Triggered:** After Step 5 completion
- **Recipient:** Vendor email
- **Subject:** "Event Connect - Vendor Registration Submitted"
- **Content:** Confirms submission, explains 24-48 hour review process

#### **2. Admin Notification Email**
- **Triggered:** After Step 5 completion
- **Recipient:** Admin emails (from .env ADMIN_EMAIL)
- **Subject:** "📋 New Vendor Registration Pending Review"
- **Content:** Vendor name, ID, link to admin dashboard

#### **3. Vendor Approval Email**
- **Triggered:** Admin clicks "Approve" button
- **Recipient:** Vendor email
- **Subject:** "🎉 Congratulations! Your Vendor Account is Approved"
- **Content:** Account approved, can login, access dashboard, manage services

#### **4. Vendor Rejection Email**
- **Triggered:** Admin clicks "Reject" button with reason
- **Recipient:** Vendor email
- **Subject:** "Event Connect - Vendor Registration Status"
- **Content:** Not approved reason, can reapply with updated info

---

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - Customer/Vendor signup
- `POST /api/auth/login` - Customer/Vendor login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-token` - Verify JWT token

### **Vendor Registration (5 Steps)**
- `POST /api/vendor-registration/register/step1/:vendorId` - Business info
- `POST /api/vendor-registration/register/step2/:vendorId` - Owner info
- `POST /api/vendor-registration/register/step3/:vendorId` - Documents
- `POST /api/vendor-registration/register/step4/:vendorId` - Services
- `POST /api/vendor-registration/register/step5/:vendorId` - Bank details
- `GET /api/vendor-registration/progress/:vendorId` - Get progress

### **Admin Authentication**
- `POST /api/admin/signup` - Create admin account
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile

### **Admin Vendor Management**
- `GET /api/admin/vendors/pending` - Get pending vendors (auth required)
- `GET /api/admin/vendors` - Get all vendors with filter (auth required)
- `GET /api/admin/vendors/:vendorId` - Get vendor details (auth required)
- `PUT /api/admin/vendors/:vendorId/approve` - Approve vendor (auth required)
- `PUT /api/admin/vendors/:vendorId/reject` - Reject vendor (auth required)

---

## 🔐 Authentication Flow

### **JWT Implementation**
- Token created on signup/login
- Stored in `localStorage.authToken`
- Sent in `Authorization: Bearer <token>` header
- Verified by `authenticateToken` middleware
- Expiration: 7 days

### **Admin JWT**
- Stored in `localStorage.adminToken`
- Verified by `authenticateAdminToken` middleware
- Same structure as user JWT

---

## 📱 Testing the Complete Flow

### **Test Scenario:**

**1. Vendor Signup:**
```
Go to: http://localhost:3003
Click: "Get Started"
Select: "Vendor"
Fill:
- Name: "John's Catering"
- Email: "john@catering.com"
- Password: "password123"
- Phone: "1234567890"
- Business Name: "John's Premium Catering"
- Business Type: "catering"
Click: "Create Account"
```

**Expected Result:**
- User created in MongoDB with role "vendor"
- Vendor profile created with `verificationStep: 0`
- Redirected to 5-step verification form
- authToken + vendorId stored in localStorage

---

**2. Complete 5 Steps:**
```
Step 1: Fill business info → Save
Step 2: Fill owner info + upload ID photo → Save
Step 3: Fill documents + upload license & certificate → Save
Step 4: Add 1-2 services with pricing → Save
Step 5: Fill bank details → Submit
```

**Expected Result:**
- Each step updates `verificationStep` in database
- After Step 5: `isVerificationComplete = true`
- Vendor receives registration confirmation email
- Admin receives notification email

---

**3. Admin Review:**
```
Go to: http://localhost:3003/admin
Email: (admin email)
Password: (admin password)
```

**If first time (create account):**
```
Signup as admin
Email: admin@eventconnect.com
Password: admin123
Click: "Create Admin Account"
```

**After Login:**
```
View pending vendors list
Click on "John's Premium Catering"
View all 5 steps of data
Click "Approve Vendor"
```

**Expected Result:**
- Vendor's `approvalStatus = "approved"`
- Vendor receives approval email
- Vendor list refreshes
- Vendor can now login

---

**4. Vendor Login (After Approval):**
```
Go to: http://localhost:3003
Click: "Get Started" → "Vendor"
Switch to: "Login"
Email: john@catering.com
Password: password123
Click: "Login"
```

**Expected Result:**
- JWT token generated
- Token stored in localStorage
- Redirected to Vendor Home/Dashboard
- Can now manage services, view bookings, etc.

---

## 📊 Progress Indicators

### **Frontend Progress Bar:**
```
Step 1 ─ Step 2 ─ Step 3 ─ Step 4 ─ Step 5
[✓]      [ ]      [ ]      [ ]      [ ]    (after step 1)
[✓]      [✓]      [ ]      [ ]      [ ]    (after step 2)
[✓]      [✓]      [✓]      [ ]      [ ]    (after step 3)
[✓]      [✓]      [✓]      [✓]      [ ]    (after step 4)
[✓]      [✓]      [✓]      [✓]      [✓]    (after step 5 - complete!)
```

### **Database Progress:**
```javascript
// After signup (initial)
verificationStep: 0
isVerificationComplete: false

// After step 1
verificationStep: 1

// After step 2
verificationStep: 2

// After step 3
verificationStep: 3

// After step 4
verificationStep: 4

// After step 5
verificationStep: 5
isVerificationComplete: true
```

---

## 🚀 How to Run Locally

### **1. Start MongoDB**
```bash
mongod --dbpath C:\mongodb_data
```

### **2. Start Backend**
```bash
cd back_end
npm run dev
```
Expected output:
```
🚀 Server running on http://localhost:5000
✅ MongoDB connected
```

### **3. Start Frontend**
```bash
cd front_end
npm run dev
```
Expected output:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:3003
```

### **4. Access Application**
- Frontend: `http://localhost:3003`
- API: `http://localhost:5000/api`
- Admin: `http://localhost:3003/admin`

---

## 📝 Environment Variables

### **Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_connect
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@eventconnect.com
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3003
```

### **Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## ✅ Checklist: What's Complete

- ✅ 5-step vendor registration form (frontend)
- ✅ Multi-step backend API with database storage
- ✅ Admin login & dashboard (frontend)
- ✅ Admin vendor approval/rejection (backend)
- ✅ Email notifications (vendor + admin)
- ✅ JWT authentication for both users & admins
- ✅ Image upload handling (base64)
- ✅ Progress tracking (verificationStep)
- ✅ Error handling & validation
- ✅ Success messages & user feedback

---

## 🔄 Next Steps (Future Development)

- [ ] Implement vendor dashboard (profile edit, service management, earnings)
- [ ] Implement customer search/filter by vendor type & location
- [ ] Create booking management system
- [ ] Implement real-time chat (Socket.IO)
- [ ] Add payment processing (Stripe integration)
- [ ] Implement review/rating system
- [ ] Add analytics & reporting
- [ ] Image optimization & CDN storage
- [ ] Implement actual email service (Gmail SMTP)
- [ ] Add vendor approval workflow (super_admin override)

---

## 📞 Support

For issues or questions about the vendor verification system, contact the development team.

