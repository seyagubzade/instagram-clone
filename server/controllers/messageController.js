const Messages = require("../models/Message.model");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, recipientId } = req.body;
    const senderId = req.user.userId;

    const newMessage = await Messages.create({
      message: {
        text: message,
      },
      sender: senderId,
      recipient: recipientId,
      status: 'sent', 
      messageType: 'text',
    });

    res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const recipientId = req.params.recipientId; 
    const userId = req.user.userId;

    // Fetch messages between the authenticated user and the recipient
    const messages = await Messages.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ success: false, message: "Failed to get messages", error: error.message });
  }
};
