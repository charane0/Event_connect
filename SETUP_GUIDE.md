# Event Connect - Complete Backend Setup Guide

## Project Overview

Event Connect is a full-stack event booking platform with the following architecture:

```
Event Connect
├── Backend (Node.js + Express)
│   ├── API Routes (Authentication, Vendors, Bookings, Payments, Chat)
│   ├── Database (MongoDB with Mongoose)
│   ├── Real-time Chat (Socket.IO)
│   └── Payment Processing (Stripe)
│
└── Frontend (React + TypeScript + Vite)
    ├── Customer Interface
    ├── Vendor Dashboard
    ├── Real-time Chat
    └── Payment Confirmation
```

## Backend Structure

```
back_end/
├── index.js                 # Main server file
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .env.local              # Local development config
│
├── middleware/
│   ├── auth.js            # JWT authentication & authorization
│   ├── errorHandler.js    # Global error handling
│   └── validation.js      # Request validation
│
├── models/
│   ├── User.js            # User schema (customers, vendors)
│   ├── Vendor.js          # Vendor profile
│   ├── Service.js         # Services offered
│   ├── Booking.js         # Booking records
│   ├── Payment.js         # Payment transactions
│   ├── Chat.js            # Chat rooms & messages
│   └── Review.js          # Customer reviews
│
├── controllers/
│   ├── authController.js       # Auth logic
│   ├── vendorController.js     # Vendor operations
│   ├── bookingController.js    # Booking management
│   ├── paymentController.js    # Payment processing
│   ├── chatController.js       # Chat operations
│   └── customerController.js   # Customer search & services
│
└── routes/
    ├── auth.routes.js      # Authentication endpoints
    ├── vendor.routes.js    # Vendor endpoints
    ├── booking.routes.js   # Booking endpoints
    ├── payment.routes.js   # Payment endpoints
    ├── chat.routes.js      # Chat endpoints
    └── customer.routes.js  # Customer endpoints
```

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd back_end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**
   ```bash
   # Windows
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

5. **Start backend server:**
   ```bash
   npm run dev    # Development mode with auto-reload
   npm start      # Production mode
   ```

   Server runs on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd front_end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env.local
   # Update API_URL to match backend
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on: `http://localhost:5173`

## API Endpoints Reference

### Authentication (`/api/auth`)
```
POST   /signup              - Register new user
POST   /login               - Login user
GET    /me                  - Get current user (requires token)
POST   /verify-token        - Verify JWT token
PUT    /profile             - Update user profile
```

### Vendors (`/api/vendors`)
```
GET    /                    - List all approved vendors
GET    /:id                 - Get vendor details
POST   /profile/create      - Create vendor profile (vendor only)
GET    /profile/me          - Get own vendor profile
PUT    /:id                 - Update vendor profile (vendor only)
GET    /stats/earnings      - Get vendor earnings (vendor only)
GET    /bookings/all        - Get vendor's bookings (vendor only)
PUT    /bookings/:bookingId/status - Update booking status (vendor only)
```

### Bookings (`/api/bookings`)
```
POST   /                    - Create booking (customer only)
GET    /customer/all        - Get customer's bookings
GET    /:id                 - Get booking details
PUT    /:id                 - Update booking (customer only)
DELETE /:id                 - Cancel booking (customer only)
GET    /                    - Get all bookings (admin only)
```

### Payments (`/api/payments`)
```
POST   /initiate            - Start payment process
POST   /:paymentId/confirm  - Confirm payment
GET    /history             - Get payment history
POST   /:paymentId/refund   - Refund payment
POST   /webhook             - Stripe webhook
```

### Chat (`/api/chats`)
```
POST   /room                - Create or get chat room
GET    /rooms               - Get all chat rooms
POST   /message             - Send message
GET    /:chatRoomId/messages - Get messages in room
PUT    /:chatRoomId/read    - Mark messages as read
DELETE /:chatRoomId         - Delete chat room
```

### Customers & Services (`/api/customers`)
```
GET    /vendors/search      - Search vendors
GET    /vendors/:vendorId/services - Get vendor services
POST   /services            - Create service (vendor only)
PUT    /services/:serviceId - Update service (vendor only)
DELETE /services/:serviceId - Delete service (vendor only)
GET    /services/filter     - Filter services
GET    /vendors/:vendorId/reviews - Get vendor reviews
POST   /reviews             - Create review (customer only)
```

## Database Models

### User
- name, email, password
- phone, role (customer/vendor/admin)
- profileImage, address, city, state, zipCode

### Vendor
- userId, businessName, businessDescription
- businessType, businessLicense
- bankAccount (accountNumber, routingNumber, etc)
- rating, reviewCount, approvalStatus
- services[], totalEarnings, completedBookings
- responseTime, availability

### Booking
- customerId, vendorId, serviceId
- eventDate, eventType, guestCount
- venueAddress, city, state
- status (pending/confirmed/in-progress/completed/cancelled)
- totalAmount, advanceAmount, paymentStatus

### Payment
- bookingId, customerId, vendorId
- amount, paymentMethod (credit_card/debit_card/upi/wallet/bank_transfer)
- status (pending/processing/completed/failed/refunded)
- stripePaymentIntentId, stripeChargeId

### ChatRoom
- customerId, vendorId, bookingId
- messages[] (content, senderId, timestamp, isRead)
- lastMessage, unreadCount

### Review
- bookingId, reviewerId, vendorId
- rating (1-5), title, comment
- photos[], helpfulCount, isVerifiedPurchase

## Frontend Integration

The frontend has a complete API client (`src/api/client.js`) that handles all API calls:

```typescript
import { authAPI, bookingAPI, vendorAPI, chatAPI } from './api/client';

// Examples:
const login = await authAPI.login(email, password);
const bookings = await bookingAPI.getMyBookings();
const vendors = await vendorAPI.getAllVendors({ businessType: 'catering' });
const rooms = await chatAPI.getChatRooms();
```

## Authentication Flow

1. User signs up with email and role (customer/vendor)
2. Server creates User document and hashes password
3. Login returns JWT token
4. Token stored in localStorage
5. All subsequent requests include token in Authorization header
6. Server validates token on protected routes
7. Token expires after configured time (default 7 days)

## Real-time Chat

Uses Socket.IO for real-time messaging:

```typescript
// Client joins room
socket.emit('join-room', roomId);

// Send message
socket.emit('send-message', { roomId, content });

// Receive message
socket.on('receive-message', (data) => { ... });

// Typing indicator
socket.emit('typing', { roomId, userId });
socket.on('user-typing', (data) => { ... });
```

## Payment Processing

Integrated with Stripe:

1. Customer initiates payment
2. Server creates Stripe PaymentIntent
3. Frontend confirms payment with Stripe
4. Server webhook updates payment status
5. Booking status updated on success

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/event_connect
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Testing the API

### Using cURL
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456","role":"customer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

### Using Postman
1. Import endpoints from API documentation
2. Set Authorization header with Bearer token
3. Test each endpoint

## Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy from git
4. Update FRONTEND_URL

### Frontend (Vercel/Netlify)
1. Set VITE_API_URL to production backend
2. Deploy from git
3. Update API endpoints

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Check port 5000 is not in use
- Check .env file exists and is configured

### Frontend can't connect to backend
- Verify backend is running on http://localhost:5000
- Check VITE_API_URL in .env.local
- Check CORS configuration in index.js
- Check browser console for errors

### Authentication errors
- Verify JWT_SECRET matches between .env files
- Check token expiration
- Clear localStorage and re-login
- Check Authorization header format: "Bearer {token}"

## Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend API client ready
3. Setup local `.env` files
4. Start MongoDB
5. Run backend and frontend
6. Test API endpoints
7. Integrate payment processing (Stripe)
8. Setup production deployment

## Support & Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Express.js Guide: https://expressjs.com/
- React Documentation: https://react.dev/
- Stripe Documentation: https://stripe.com/docs
- Socket.IO Guide: https://socket.io/docs/

---

**Backend Created:** ✅ Complete
**Frontend API Client:** ✅ Ready
**Database Models:** ✅ Configured
**Routes & Controllers:** ✅ Implemented
