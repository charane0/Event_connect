const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Create or get chat room
router.post(
  '/room',
  authenticateToken,
  chatController.createOrGetChatRoom
);

// Get all chat rooms for user
router.get(
  '/rooms',
  authenticateToken,
  chatController.getChatRooms
);

// Send message
router.post(
  '/message',
  authenticateToken,
  chatController.sendMessage
);

// Get messages from a chat room
router.get(
  '/:chatRoomId/messages',
  authenticateToken,
  chatController.getMessages
);

// Mark messages as read
router.put(
  '/:chatRoomId/read',
  authenticateToken,
  chatController.markMessagesAsRead
);

// Delete chat room
router.delete(
  '/:chatRoomId',
  authenticateToken,
  chatController.deleteChatRoom
);

module.exports = router;
