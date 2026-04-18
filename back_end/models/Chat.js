const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderName: String,
  senderRole: {
    type: String,
    enum: ['customer', 'vendor'],
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [
    {
      type: String, // file URL
    },
  ],
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatRoomSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  messages: [messageSchema],
  lastMessage: {
    content: String,
    timestamp: Date,
  },
  unreadCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  ChatRoom: mongoose.model('ChatRoom', chatRoomSchema),
  Message: mongoose.model('Message', messageSchema),
};
