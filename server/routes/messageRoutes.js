const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const messageController = require('../controllers/messageController');

// Route to send a message
router.post('/messages/send', authenticateUser, messageController.sendMessage);

// Route to get messages with a specific recipient
router.get('/messages/:recipientId', authenticateUser, messageController.getMessages);

module.exports = router;
