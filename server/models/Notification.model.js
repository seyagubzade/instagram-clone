const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String, // "like", "comment", "follow"
  content: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
