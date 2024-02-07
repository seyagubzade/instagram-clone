const Notification = require("../models/Notification.model");
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
    user.posts.push(newPost); // Push the entire new post object
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
  const userId = req.params.id; // Access userId from the request object after authentication
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
  const { username } = req.body;

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

    // Create a notification for the post author
    const notification = new Notification({
      user: post.author,
      type: 'like',
      content: `${username} liked your post`,
      postId: postId,
      authorId: userId,
      read: false
    });
    await notification.save();

    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Unlike a Post
exports.unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; // Assuming you attach userId to the request object after authentication

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post not liked by the user" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId);
    await post.save();

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Add a Comment
exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { text, username } = req.body;
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

    // Create a notification for the post author
    const notification = new Notification({
      user: post.author,
      type: 'comment',
      content: `${username} commented on your post`,
      postId: postId,
      authorId: userId,
      read: false
    });
    await notification.save();

    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get posts from users the current user follows
exports.getPostsFromFollowing = async (req, res) => {
  const userId = req.user.userId; // Assuming you attach userId to the request object after authentication

  try {
    // Find the current user to get the list of users they follow
    const user = await User.findById(userId);
    const followingIds = user.following; // Assuming following is an array of user IDs

    // Find all posts from users the current user follows
    const postsFromFollowing = await Post.find({ author: { $in: followingIds } })
      .populate({
        path: 'author',
        select: 'name username profileImg', // Select the fields you want to populate
      })
      .populate('comments.author', 'name');

    res.json(postsFromFollowing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
