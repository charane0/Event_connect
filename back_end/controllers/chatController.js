const { ChatRoom, Message } = require('../models/Chat');
const User = require('../models/User');

exports.createOrGetChatRoom = async (req, res) => {
  try {
    const { vendorId, customerId, bookingId } = req.body;

    let chatRoom = await ChatRoom.findOne({
      $or: [
        { customerId: customerId, vendorId: vendorId },
        { customerId: vendorId, vendorId: customerId },
      ],
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        customerId,
        vendorId,
        bookingId,
        messages: [],
      });
      await chatRoom.save();
    }

    res.status(200).json({
      success: true,
      chatRoom,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatRoomId, content, attachments } = req.body;

    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    const user = await User.findById(req.user.id);

    const message = {
      senderId: req.user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      attachments: attachments || [],
      isRead: false,
      createdAt: Date.now(),
    };

    chatRoom.messages.push(message);
    chatRoom.lastMessage = {
      content,
      timestamp: Date.now(),
    };
    chatRoom.updatedAt = Date.now();

    await chatRoom.save();

    // Emit via socket.io if available
    if (req.io) {
      req.io.to(chatRoomId).emit('receive-message', {
        chatRoomId,
        message,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Message sent',
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const chatRoom = await ChatRoom.findById(chatRoomId).populate('messages.senderId', 'name profileImage');

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.status(200).json({
      success: true,
      messages: chatRoom.messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({
      $or: [{ customerId: req.user.id }, { vendorId: req.user.id }],
    })
      .populate('customerId', 'name email profileImage')
      .populate('vendorId', 'businessName profileImage')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: chatRooms.length,
      chatRooms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markMessagesAsRead = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const chatRoom = await ChatRoom.findByIdAndUpdate(
      chatRoomId,
      {
        $set: { 'messages.$[].isRead': true },
        unreadCount: 0,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
      chatRoom,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteChatRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    await ChatRoom.findByIdAndDelete(chatRoomId);

    res.status(200).json({
      success: true,
      message: 'Chat room deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
