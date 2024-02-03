const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateUser = require('../middleware/authenticateUser');

// Create post route
router.post('/posts', authenticateUser, postController.createPost);

// Get all posts route
router.get('/posts', postController.getAllPosts);

// Get all posts route
router.get('/user/:id/posts', postController.getAllPostsByUser);

// Get posts by id route
router.get('/posts/:id', postController.getPostById);

// Delete posts by id route
router.delete('/posts/:id', postController.deletePostById);

// Like a post
router.put('/posts/:id/like', authenticateUser, postController.likePost);

// Add a comment to a post
router.put('/posts/:id/comments', authenticateUser, postController.addComment);

module.exports = router;
