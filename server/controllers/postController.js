const Post = require("../models/Post.model");
const User = require("../models/User.model");

// Create post
exports.createPost = async (req, res) => {
  const { imageURL, caption } = req.body;
  const authorId = req.user.userId; // Access userId from the request object after authentication

  try {
    // Create a new post
    const newPost = new Post({ imageURL, caption, author: authorId });
    await newPost.save();

    // Add the post to the user's posts array
    const user = await User.findById(authorId);
    user.posts.push(newPost._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find()
      .populate("author", "name")
      .populate("comments.author", "name");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts by user
exports.getAllPostsByUser = async (req, res) => {
  const userId = req.user.userId; // Access userId from the request object after authentication
  try {
    // Fetch all posts of the current user from the database
    const posts = await Post.find({ author: userId })
      .populate("author", "name")
      .populate("comments.author", "name");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by ID and delete it
    await Post.findByIdAndDelete(postId);

    // Remove the post ID from the user's posts array
    await User.updateOne({ posts: postId }, { $pull: { posts: postId } });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by ID
    const post = await Post.findById(postId)
      .populate("author", "name")
      .populate("comments.author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a Post
exports.likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; // Assuming you attach userId to the request object after authentication

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Post already liked by the user" });
    }

    // Add the user's ID to the likes array
    post.likes.push(userId);
    await post.save();

    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a Comment
exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.user.userId; // Assuming you attach userId to the request object after authentication

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the comments array
    post.comments.push({ text, author: userId });
    await post.save();

    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
