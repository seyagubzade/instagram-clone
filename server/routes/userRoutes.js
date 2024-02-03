const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticateUser');

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Delete user route
router.delete('/user/:id', userController.deleteUser);

// Get all users route
router.get('/users', userController.getAllUsers);

// Get user by id route
router.get('/users/:id', userController.getUserById);

// Update user profile route
router.put('/users/profile', authenticateUser, userController.updateUserProfile);

// Follow a user route
router.put('/users/follow', authenticateUser, userController.followUser);

// Unfollow a user route
router.put('/users/unfollow', authenticateUser, userController.unfollowUser);

// Unfollow a user route
router.get('/users/search/:username', userController.searchUserByUsername);


module.exports = router;
