const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    profileImg: String
  },
  byWhom: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    profileImg: String
  },
  type: String, // "like", "comment", "follow"
  content: String,
  read: { type: Boolean, default: false },
  post: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    imageURL: String
  },
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
