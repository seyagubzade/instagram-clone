const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateUser = require('../middleware/authenticateUser');

// Create post route
router.post('/posts', authenticateUser, postController.createPost);

// Get all posts route
router.get('/posts', postController.getAllPosts);

// Get all posts route
router.get('/user/posts', authenticateUser, postController.getAllPostsByUser);

// Get posts by id route
router.get('/posts/:id', postController.getPostById);

// Delete posts by id route
router.delete('/posts/:id', postController.deletePostById);

// Like a post
router.put('/posts/:id/like', postController.likePost);

// Add a comment to a post
router.post('/posts/:id/comments', postController.addComment);

module.exports = router;
