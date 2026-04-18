const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const vendorRoutes = require('./routes/vendor.routes');
const bookingRoutes = require('./routes/booking.routes');
const paymentRoutes = require('./routes/payment.routes');
const chatRoutes = require('./routes/chat.routes');
const customerRoutes = require('./routes/customer.routes');
const adminRoutes = require('./routes/admin.routes');
const vendorRegistrationRoutes = require('./routes/vendorRegistration.routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_connect')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/vendor-registration', vendorRegistrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/customers', customerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Socket.IO setup for real-time chat
io.on('connection', (socket) => {
  console.log(`📱 New client connected: ${socket.id}`);

  // Join a chat room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`👤 User joined room: ${roomId}`);
  });

  // Send message
  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', data);
  });

  // Typing indicator
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user-typing', { userId: data.userId });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = { app, io };
