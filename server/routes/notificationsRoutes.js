const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateUser = require('../middleware/authenticateUser');


router.get('/notifications', authenticateUser, notificationController.getNotifications);
router.put('/notifications/:id/mark-as-read', authenticateUser, notificationController.markNotificationAsRead);

module.exports = router;