# Event Connect Backend

Complete Node.js + Express backend for Event Connect application.

## Features

- ✅ User Authentication (JWT)
- ✅ Vendor Management & Onboarding
- ✅ Booking System
- ✅ Payment Processing (Stripe)
- ✅ Real-time Chat (Socket.IO)
- ✅ Reviews & Ratings
- ✅ Service Management
- ✅ Earnings Tracking

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Key configurations:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STRIPE_SECRET_KEY` - Stripe API key for payments
- `FRONTEND_URL` - Frontend URL for CORS

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Windows with MongoDB installed
mongod

# Or use MongoDB Atlas for cloud database
```

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile

### Vendors
- `GET /api/vendors` - Get all approved vendors
- `GET /api/vendors/:id` - Get vendor details
- `POST /api/vendors/profile/create` - Create vendor profile
- `GET /api/vendors/profile/me` - Get own vendor profile
- `PUT /api/vendors/:id` - Update vendor profile
- `GET /api/vendors/stats/earnings` - Get vendor earnings

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/customer/all` - Get customer bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/initiate` - Start payment
- `POST /api/payments/:paymentId/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/:paymentId/refund` - Refund payment

### Chat
- `POST /api/chats/room` - Create/get chat room
- `GET /api/chats/rooms` - Get all chat rooms
- `POST /api/chats/message` - Send message
- `GET /api/chats/:chatRoomId/messages` - Get messages

### Services & Search
- `GET /api/customers/vendors/search` - Search vendors
- `GET /api/customers/services/filter` - Filter services
- `POST /api/customers/services` - Create service
- `PUT /api/customers/services/:serviceId` - Update service
- `DELETE /api/customers/services/:serviceId` - Delete service

### Reviews
- `GET /api/customers/vendors/:vendorId/reviews` - Get vendor reviews
- `POST /api/customers/reviews` - Create review

## Database Schema

### Collections:
- **Users** - Customers, vendors, admins
- **Vendors** - Vendor profiles & details
- **Services** - Services offered by vendors
- **Bookings** - Booking records
- **Payments** - Payment transactions
- **ChatRooms** - Chat conversations
- **Reviews** - Customer reviews

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Socket.IO** - Real-time chat
- **bcryptjs** - Password hashing

## Debugging

To enable detailed logging, set:
```
NODE_ENV=development
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Update JWT_SECRET to a strong key
3. Configure proper MongoDB connection
4. Set STRIPE keys properly
5. Update FRONTEND_URL to production URL
6. Use a process manager (PM2, forever)
7. Set up proper error logging

## Support

For issues or questions, check logs or create an issue.
