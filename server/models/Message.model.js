const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
    {
      message: {
        text: { type: String, required: true },
        attachments: [{ type: String }], 
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
      isRead: { type: Boolean, default: false },
      messageType: { type: String, enum: ['text', 'image', 'video', 'system'], default: 'text' },
    },
    {
      timestamps: true,
    }
  );
  

module.exports = mongoose.model("Messages", MessageSchema);