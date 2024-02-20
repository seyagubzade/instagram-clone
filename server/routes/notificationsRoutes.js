const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateUser = require('../middleware/authenticateUser');

// get all notifications
router.get('/notifications', authenticateUser, notificationController.getNotifications);

// mark as read notifications
router.put('/notifications/:id/mark-as-read', authenticateUser, notificationController.markNotificationAsRead);

module.exports = router;